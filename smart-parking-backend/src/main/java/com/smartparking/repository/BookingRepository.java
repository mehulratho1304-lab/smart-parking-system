package com.smartparking.repository;

import com.smartparking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    boolean existsByParkingSlotIdAndBookingDateAndStatusInAndStartTimeLessThanAndEndTimeGreaterThan(
            Long parkingSlotId,
            LocalDate bookingDate,
            List<String> statuses,
            LocalTime endTime,
            LocalTime startTime
    );

    List<Booking> findByUserId(Long userId);

    Optional<Booking> findByQrCode(String qrCode);
}