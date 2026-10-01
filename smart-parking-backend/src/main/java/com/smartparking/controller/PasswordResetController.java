package com.smartparking.controller;

import com.smartparking.entity.User;
import com.smartparking.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reset")
public class PasswordResetController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PutMapping("/admin-password")
    public String resetAdminPassword(@RequestParam String newPassword) {

        User admin = userRepository.findByEmail("arbaz@gmail.com")
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        admin.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(admin);

        return "Admin password reset successfully";
    }
}