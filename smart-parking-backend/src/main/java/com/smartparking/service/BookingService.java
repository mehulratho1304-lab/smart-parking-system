package com.smartparking.service;

import com.smartparking.entity.Booking;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.entity.User;
import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.smartparking.exception.BookingException;
import com.smartparking.dto.BookingResponseDTO;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ParkingSlotRepository parkingSlotRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            ParkingSlotRepository parkingSlotRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.parkingSlotRepository = parkingSlotRepository;
    }

    // CREATE BOOKING
    public Booking createBooking(Long userId, Long parkingSlotId, Booking booking) {

        // Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find parking slot
        ParkingSlot parkingSlot = parkingSlotRepository.findById(parkingSlotId)
                .orElseThrow(() -> new RuntimeException("Parking slot not found"));
        
        
        if (booking.getBookingDate() == null
                || booking.getStartTime() == null
                || booking.getEndTime() == null) {

            throw new BookingException(
                    "Booking date, start time and end time are required"
            );
        }

        if (!booking.getEndTime().isAfter(booking.getStartTime())) {

            throw new BookingException(
                    "End time must be after start time"
            );
            
            
            
        }  

        // Check availability
        if (!parkingSlot.getAvailable()) {
            throw new BookingException("Parking slot is already booked");
        }
        // check overlapping booking
        boolean alreadyBooked =
                bookingRepository
                        .existsByParkingSlotIdAndBookingDateAndStatusInAndStartTimeLessThanAndEndTimeGreaterThan(
                                parkingSlotId,
                                booking.getBookingDate(),
                                List.of("CONFIRMED", "CHECKED_IN"),
                                booking.getEndTime(),
                                booking.getStartTime()
                        );

        if (alreadyBooked) {
            throw new BookingException(
                    "Parking slot is already booked for this time"
            );
        }

        // Connect user and parking slot
        booking.setUser(user);
        booking.setParkingSlot(parkingSlot);

        // Set booking status
        booking.setStatus("CONFIRMED");
        
        booking.setQrCode(
                java.util.UUID.randomUUID().toString()
        );
        // Make slot unavailable
        parkingSlot.setAvailable(false);
        parkingSlotRepository.save(parkingSlot);

        // Save booking
        return bookingRepository.save(booking);
    }

    // GET ALL BOOKINGS
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // GET BOOKING BY ID
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
   
    public Booking cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingException("Booking not found"));

        if (booking.getStatus().equals("CANCELLED")) {
            throw new BookingException("Booking is already cancelled");
        }

        booking.setStatus("CANCELLED");

        ParkingSlot parkingSlot = booking.getParkingSlot();
        parkingSlot.setAvailable(true);

        parkingSlotRepository.save(parkingSlot);

        return bookingRepository.save(booking);
    }
    
    public List<Booking> getBookingsByUser(Long userId) {

        return bookingRepository.findByUserId(userId);
    }
    
    
    public boolean isSlotAvailable(
            Long parkingSlotId,
            java.time.LocalDate bookingDate,
            java.time.LocalTime startTime,
            java.time.LocalTime endTime) {

    	boolean booked =
    	        bookingRepository
    	                .existsByParkingSlotIdAndBookingDateAndStatusInAndStartTimeLessThanAndEndTimeGreaterThan(
    	                        parkingSlotId,
    	                        bookingDate,
    	                        List.of("CONFIRMED", "CHECKED_IN"),
    	                        endTime,
    	                        startTime
    	                );

        return !booked;
    }
    
    public List<BookingResponseDTO> getMyBookings(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BookingException("User not found"));

        return bookingRepository.findByUserId(user.getId())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
   
    private BookingResponseDTO convertToDTO(Booking booking) {

        return new BookingResponseDTO(
                booking.getId(),
                booking.getUser().getId(),
                booking.getParkingSlot().getId(),
                booking.getBookingDate(),
                booking.getStartTime(),
                booking.getEndTime(),
                booking.getStatus(),
                booking.getQrCode(),
                booking.getParkingFee()
        );
    }
    

    
    
    public Booking checkIn(String qrCode) {

   
    	Booking booking = bookingRepository.findByQrCode(qrCode)
    	        .orElseThrow(() ->
    	                new BookingException("Invalid QR code"));
    	
    	
        if ("CANCELLED".equals(booking.getStatus())) {
            throw new BookingException("Booking is cancelled");
        }

        if ("CHECKED_IN".equals(booking.getStatus())) {
            throw new BookingException("Vehicle is already checked in");
        }

        booking.setStatus("CHECKED_IN");
        booking.setCheckInTime(java.time.LocalDateTime.now());

        return bookingRepository.save(booking);
    }
    
    
    
    public Booking checkOut(String qrCode) {

       	Booking booking = bookingRepository.findByQrCode(qrCode)
    	        .orElseThrow(() ->
    	                new BookingException("Invalid QR code"));
    	
    	
        // Check whether vehicle is actually checked in
        if (!"CHECKED_IN".equals(booking.getStatus())) {
            throw new BookingException(
                    "Vehicle is not currently checked in"
            );
        }

        // Set checkout time
        java.time.LocalDateTime checkOutTime =
                java.time.LocalDateTime.now();

        booking.setCheckOutTime(checkOutTime);

        // Calculate parking duration
        java.time.Duration duration =
                java.time.Duration.between(
                        booking.getCheckInTime(),
                        checkOutTime
                );

        long minutes = duration.toMinutes();

        // Calculate parking fee
        double parkingFee;

        if (minutes <= 60) {
            parkingFee = 20;
        } else {
            long extraHours =
                    (long) Math.ceil((minutes - 60) / 60.0);

            parkingFee = 20 + (extraHours * 20);
        }

        booking.setParkingFee(parkingFee);

        // Change booking status
        booking.setStatus("COMPLETED");

        // Make parking slot available again
        ParkingSlot parkingSlot =
                booking.getParkingSlot();

        parkingSlot.setAvailable(true);

        parkingSlotRepository.save(parkingSlot);

   
        // Save booking
        return bookingRepository.save(booking);
    }
}