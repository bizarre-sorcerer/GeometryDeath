package app.core;

import app.controllers.AuthController;
import app.services.UserService;
import app.services.impl.UserServiceImplementation;
import io.javalin.Javalin;

public class BackendApplication {
    private static final Javalin app = Javalin.create(config -> {
        config.showJavalinBanner = false;
    });
    private static final Injector injector = new Injector();

    private static void handleDependencyInjection(){
        UserServiceImplementation userServiceImpl = new UserServiceImplementation();
        injector.bindSingleton(UserServiceImplementation.class, userServiceImpl);
        injector.bindSingleton(UserService.class, userServiceImpl);
    }

    public static void run(){
        handleDependencyInjection();
        AuthController authController = new AuthController(injector.get(UserService.class));

        app.start(8080);
        authController.registerRoutes(app);
    }
}
