package com.smartparking.controller;

import com.smartparking.entity.User;
import com.smartparking.dto.LoginResponse;
import com.smartparking.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }
    
    @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {

        return userService.loginUser(
            user.getEmail(),
            user.getPassword()
        );
    }


}