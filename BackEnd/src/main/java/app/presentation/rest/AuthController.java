package app.presentation.rest;

import app.presentation.dto.request.CreateGuestAccountDTO;
import app.presentation.dto.request.UpgradeGuestAccountDTO;
import app.presentation.dto.response.ResponseEntity;
import app.services.AuthService;
import io.javalin.Javalin;

public class AuthController {
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public void registerRoutes(Javalin app){
        app.post("/api/auth/create-guest-account", ctx ->  {
            CreateGuestAccountDTO dto = ctx.bodyAsClass(CreateGuestAccountDTO.class);

            ctx.json(authService.createGuestUser(dto));
        });

        app.patch("/api/auth/upgrade-guest-account", ctx ->  {
            UpgradeGuestAccountDTO dto = ctx.bodyAsClass(UpgradeGuestAccountDTO.class);

            ctx.json(authService.upgradeGuestUser(dto));
        });
    }
}
