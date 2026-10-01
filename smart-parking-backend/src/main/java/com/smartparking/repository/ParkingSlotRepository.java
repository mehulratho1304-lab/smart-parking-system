/* package com.smartparking.repository;

import com.smartparking.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface ParkingSlotRepository
        extends JpaRepository<ParkingSlot, Long> {

} */

package com.smartparking.repository;

import com.smartparking.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    List<ParkingSlot> findByAvailableTrue();

    List<ParkingSlot> findByAvailableTrueAndVehicleType(String vehicleType);
}