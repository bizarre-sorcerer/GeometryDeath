package com.GeometryDeath.GeometryDeathBE.controllers;

import com.GeometryDeath.GeometryDeathBE.services.AuthService;
import com.GeometryDeath.GeometryDeathBE.services.impl.AuthServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
public class AuthController {
    AuthServiceImpl authService;

    @PostMapping("/")
    public void createTemporaryAccount(String username) {
        authService.createTemporaryAccount(username);
    }

    @PostMapping("/sign-in")
    public void logInUser() {
        // to do
        System.out.println("LogInUser");
    }

    @PostMapping("/sign-up")
    public void registerUser() {
        // to do
        System.out.println("RegisterUser");
    }
}
