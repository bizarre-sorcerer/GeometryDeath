package app.controllers;

import app.models.dtos.UserDTO;
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
            UserDTO dto = ctx.bodyAsClass(UserDTO.class);

            userService.createGuestUser(dto);
        });
    }
}
