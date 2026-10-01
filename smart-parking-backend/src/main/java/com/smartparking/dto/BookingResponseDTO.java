package com.smartparking.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookingResponseDTO {

    private Long id;
    private Long userId;
    private Long parkingSlotId;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
    private String qrCode;
    private Double parkingFee;

    public BookingResponseDTO(
            Long id,
            Long userId,
            Long parkingSlotId,
            LocalDate bookingDate,
            LocalTime startTime,
            LocalTime endTime,
            String status,
            String qrCode,
            Double parkingFee) {

        this.id = id;
        this.userId = userId;
        this.parkingSlotId = parkingSlotId;
        this.bookingDate = bookingDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.qrCode = qrCode;
        this.parkingFee = parkingFee;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getParkingSlotId() {
        return parkingSlotId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public String getStatus() {
        return status;
    }

    public String getQrCode() {
        return qrCode;
    }

    public Double getParkingFee() {
        return parkingFee;
    }
}