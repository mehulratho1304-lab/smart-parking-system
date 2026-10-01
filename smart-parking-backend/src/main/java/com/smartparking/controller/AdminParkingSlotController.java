package com.smartparking.controller;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.service.ParkingSlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/parking-slots")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminParkingSlotController {

    private final ParkingSlotService parkingSlotService;

    public AdminParkingSlotController(ParkingSlotService parkingSlotService) {
        this.parkingSlotService = parkingSlotService;
    }

    @PostMapping
    public ParkingSlot addSlot(@RequestBody ParkingSlot parkingSlot) {
        return parkingSlotService.addSlot(parkingSlot);
    }

    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotService.getAllSlots();
    }

    @PutMapping("/{id}")
    public ParkingSlot updateSlot(
            @PathVariable Long id,
            @RequestBody ParkingSlot parkingSlot) {

        return parkingSlotService.updateSlot(id, parkingSlot);
    }

    @DeleteMapping("/{id}")
    public String deleteSlot(@PathVariable Long id) {

        parkingSlotService.deleteSlot(id);

        return "Parking slot deleted successfully";
    }
}