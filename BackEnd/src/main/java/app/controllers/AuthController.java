package app.controllers;

import app.models.dtos.CreateGuestUserDTO;
import app.services.UserService;
import io.javalin.Javalin;

public class AuthController {
    private UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    public void registerRoutes(Javalin app){
        app.get("/", context -> context.result("Geometry Death BackEnd"));

        app.post("/api/auth/createGuest", ctx ->  {
            CreateGuestUserDTO dto = ctx.bodyAsClass(CreateGuestUserDTO.class);

            userService.createGuestUser(dto);
        });
    }
}
