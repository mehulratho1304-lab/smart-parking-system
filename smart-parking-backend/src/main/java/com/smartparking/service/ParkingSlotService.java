/* package com.smartparking.service;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository parkingSlotRepository;

    public ParkingSlotService(ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }

    public ParkingSlot addSlot(ParkingSlot parkingSlot) {
        return parkingSlotRepository.save(parkingSlot);
    }

    public List<ParkingSlot> getAllSlots() {
        return parkingSlotRepository.findAll();
    }
} */


package com.smartparking.service;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository parkingSlotRepository;

    public ParkingSlotService(ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }

    // CREATE
    public ParkingSlot addSlot(ParkingSlot parkingSlot) {
        return parkingSlotRepository.save(parkingSlot);
    }

    // READ ALL
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotRepository.findAll();
    }

    // READ ONE
    public ParkingSlot getSlotById(Long id) {
        return parkingSlotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking slot not found"));
    }

    // UPDATE
    public ParkingSlot updateSlot(Long id, ParkingSlot updatedSlot) {

        ParkingSlot existingSlot = parkingSlotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking slot not found"));

        existingSlot.setSlotNumber(updatedSlot.getSlotNumber());
        existingSlot.setLocation(updatedSlot.getLocation());
        existingSlot.setVehicleType(updatedSlot.getVehicleType());
        existingSlot.setAvailable(updatedSlot.getAvailable());

        return parkingSlotRepository.save(existingSlot);
    }

    // DELETE
    public void deleteSlot(Long id) {

        ParkingSlot existingSlot = parkingSlotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking slot not found"));

        parkingSlotRepository.delete(existingSlot);
    }
    
    public List<ParkingSlot> getAvailableSlots() {
        return parkingSlotRepository.findByAvailableTrue();
    }

    public List<ParkingSlot> getAvailableSlotsByVehicleType(String vehicleType) {
        return parkingSlotRepository
                .findByAvailableTrueAndVehicleType(vehicleType);
    }
}