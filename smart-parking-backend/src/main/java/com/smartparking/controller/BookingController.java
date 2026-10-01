package com.smartparking.controller;

import com.smartparking.entity.Booking;
import com.smartparking.service.QRCodeService;
import com.google.zxing.WriterException;
import com.smartparking.repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.smartparking.entity.User;
import java.io.IOException;
import com.smartparking.service.BookingService;
import org.springframework.web.bind.annotation.*;
import com.smartparking.dto.BookingResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;
    private final QRCodeService qrCodeService;
    private final UserRepository userRepository;
    public BookingController(
    		BookingService bookingService,
    		QRCodeService qrCodeService,
    		UserRepository userRepository
    		) {
        this.bookingService = bookingService;
    this.qrCodeService = qrCodeService;
    this.userRepository = userRepository;
    }

    // CREATE BOOKING
    @PostMapping
    public Booking createBooking(
            @AuthenticationPrincipal String email,
            @RequestParam Long parkingSlotId,
            @RequestBody Booking booking) {

        System.out.println("CREATE BOOKING API CALLED");
        System.out.println("LOGGED IN EMAIL: " + email);
        System.out.println("PARKING SLOT ID: " + parkingSlotId);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingService.createBooking(
                user.getId(),
                parkingSlotId,
                booking
        );
    }

    // GET ALL BOOKINGS
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // GET BOOKING BY ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }
    
    @PutMapping("/{id}/cancel")
    public Booking cancelBooking(@PathVariable Long id) {

    	 System.out.println("CANCEL BOOKING API CALLED - ID: " + id);
        return bookingService.cancelBooking(id);
    }
    
    
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
    	 System.out.println("GET USER BOOKINGS API CALLED - USER ID: " + userId);
        return bookingService.getBookingsByUser(userId);
    }
    
    
    @GetMapping("/availability")
    public boolean checkAvailability(
            @RequestParam Long parkingSlotId,
            @RequestParam String bookingDate,
            @RequestParam String startTime,
            @RequestParam String endTime) {

        return bookingService.isSlotAvailable(
                parkingSlotId,
                java.time.LocalDate.parse(bookingDate),
                java.time.LocalTime.parse(startTime),
                java.time.LocalTime.parse(endTime)
        );
    }
    
    @GetMapping("/my")
    public List<BookingResponseDTO> getMyBookings(
            @org.springframework.security.core.annotation.AuthenticationPrincipal
            String email) {

        return bookingService.getMyBookings(email);
    }
   
    @PostMapping("/check-in")
    public Booking checkIn(@RequestParam String qrCode) {

        return bookingService.checkIn(qrCode);
    }
    
    @PostMapping("/check-out")
    public Booking checkOut(@RequestParam String qrCode) {

        return bookingService.checkOut(qrCode);
    }
    
    @GetMapping("/{id}/qr")
    public org.springframework.http.ResponseEntity<byte[]> generateQRCode(
            @PathVariable Long id)
            throws WriterException, IOException {

        Booking booking = bookingService.getBookingById(id);

        byte[] qrImage = qrCodeService.generateQRCode(
                booking.getQrCode(),
                300,
                300
        );

        return org.springframework.http.ResponseEntity.ok()
                .header(
                        org.springframework.http.HttpHeaders.CONTENT_TYPE,
                       "image/png"
                )
                .body(qrImage);
    }
    
    
    
    
    
    
    
}