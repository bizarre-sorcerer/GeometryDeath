package app.presentation.rest;

import app.presentation.dto.request.CreateGuestAccountRequest;
import app.services.UserService;
import io.javalin.Javalin;

public class AuthController {
    private UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    public void registerRoutes(Javalin app){
        app.post("/api/auth/create-guest-account", ctx ->  {
            CreateGuestAccountRequest dto = ctx.bodyAsClass(CreateGuestAccountRequest.class);

            userService.createGuestUser(dto);
        });
    }
}
