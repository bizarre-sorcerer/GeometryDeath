package com.bizarresorcerer.controllers;

import com.bizarresorcerer.services.impl.AuthServiceImpl;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Secured(SecurityRule.IS_ANONYMOUS)
@Controller("/api/auth")
public class AuthController {

    AuthServiceImpl authService;

    @Post("/create-guest-account")
    public HttpResponse<String> createTemporaryAccount(@QueryValue String username) {
        return authService.createGuestAccount(username);
    }

    @Post("/sign-in")
    public HttpResponse<HttpStatus> logInUser() {
        return null;
    }

    @Post("/sign-up")
    public void registerUser() {
        // to do
        System.out.println("RegisterUser");
    }
}
