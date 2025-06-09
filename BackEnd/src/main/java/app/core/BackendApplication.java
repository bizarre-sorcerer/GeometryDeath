package app.core;

import app.controllers.AuthController;
import app.mappers.UsersMapper;
import app.repositories.UserRepository;
import app.repositories.impl.UserRepositoryImpl;
import app.services.UserService;
import app.services.impl.UserServiceImpl;
import io.javalin.Javalin;

public class BackendApplication {
    private static final Javalin app = Javalin.create(config -> {
        config.showJavalinBanner = false;
    });
    private static final Injector injector = new Injector();

    private static void handleDependencyInjection(){
        UserRepositoryImpl userRepositoryImpl = new UserRepositoryImpl();
        injector.bindSingleton(UserRepositoryImpl.class, userRepositoryImpl);
        injector.bindSingleton(UserRepository.class, userRepositoryImpl);

        UsersMapper usersMapper = new UsersMapper();
        injector.bindSingleton(UsersMapper.class, usersMapper);

        UserServiceImpl userServiceImpl = new UserServiceImpl(injector.get(UserRepository.class), injector.get(UsersMapper.class));
        injector.bindSingleton(UserServiceImpl.class, userServiceImpl);
        injector.bindSingleton(UserService.class, userServiceImpl);
    }

    public static void run(){
        handleDependencyInjection();
        AuthController authController = new AuthController(injector.get(UserService.class));

        app.start(8080);
        authController.registerRoutes(app);
    }
}
