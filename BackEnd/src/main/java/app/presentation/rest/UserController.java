package app.presentation.rest;


import app.services.UserService;
import io.javalin.Javalin;

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public void registerRoutes(Javalin app){
        app.get("/api/users/info", ctx ->  {
            String username = ctx.queryParam("username");

            ctx.json(userService.getUserByUsername(username));
        });
    }
}
