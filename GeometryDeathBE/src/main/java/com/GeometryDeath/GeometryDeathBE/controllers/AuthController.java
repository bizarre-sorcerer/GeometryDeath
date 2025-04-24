package com.GeometryDeath.GeometryDeathBE.controllers;

import com.GeometryDeath.GeometryDeathBE.services.impl.AuthServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    AuthServiceImpl authService;

    @PostMapping("/create-guest-account")
    public ResponseEntity<String> createTemporaryAccount(@RequestParam String username) {
        return authService.createGuestAccount(username);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<HttpStatus> logInUser() {
        return null;
    }

    @PostMapping("/sign-up")
    public void registerUser() {
        // to do
        System.out.println("RegisterUser");
    }
}
