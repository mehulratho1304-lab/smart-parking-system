/* package com.smartparking.controller;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.ParkingSlotRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin(origins = "http://localhost:5173")
public class ParkingSlotController {

    private final ParkingSlotRepository parkingSlotRepository;

    public ParkingSlotController(
            ParkingSlotRepository parkingSlotRepository) {

        this.parkingSlotRepository = parkingSlotRepository;
    }

    @PostMapping("/slots")
    public ParkingSlot createSlot(
            @RequestBody ParkingSlot parkingSlot) {

        return parkingSlotRepository.save(parkingSlot);
    }

    @GetMapping("/slots")
    public List<ParkingSlot> getAllSlots() {

        return parkingSlotRepository.findAll();
    }

    @GetMapping("/slots/available")
    public List<ParkingSlot> getAvailableSlots() {

        return parkingSlotRepository.findByAvailableTrue();
    }
}  */



/*  package com.smartparking.controller;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.service.ParkingSlotService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-slots")
public class ParkingSlotController {

    private final ParkingSlotService parkingSlotService;

    public ParkingSlotController(ParkingSlotService parkingSlotService) {
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
}  */

package com.smartparking.controller;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.service.ParkingSlotService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-slots")
public class ParkingSlotController {

    private final ParkingSlotService parkingSlotService;

    public ParkingSlotController(ParkingSlotService parkingSlotService) {
        this.parkingSlotService = parkingSlotService;
    }

    // CREATE
    @PostMapping
    public ParkingSlot addSlot(@RequestBody ParkingSlot parkingSlot) {
        return parkingSlotService.addSlot(parkingSlot);
    }

    // READ ALL
    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotService.getAllSlots();
    }

    // READ ONE
    @GetMapping("/{id}")
    public ParkingSlot getSlotById(@PathVariable Long id) {
        return parkingSlotService.getSlotById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ParkingSlot updateSlot(
            @PathVariable Long id,
            @RequestBody ParkingSlot parkingSlot) {

        return parkingSlotService.updateSlot(id, parkingSlot);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteSlot(@PathVariable Long id) {

        parkingSlotService.deleteSlot(id);

        return "Parking slot deleted successfully";
    }
    
    @GetMapping("/available")
    public List<ParkingSlot> getAvailableSlots() {
        return parkingSlotService.getAvailableSlots();
    }

    @GetMapping("/available/type")
    public List<ParkingSlot> getAvailableSlotsByVehicleType(
            @RequestParam String vehicleType) {

        return parkingSlotService
                .getAvailableSlotsByVehicleType(vehicleType);
    }
    
    
    
}