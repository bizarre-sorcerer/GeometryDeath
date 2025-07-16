package app.core;

import app.presentation.rest.AuthController;
import app.config.mappers.UsersMapper;
import app.repositories.RankRepository;
import app.repositories.RoleRepository;
import app.repositories.UserRepository;
import app.repositories.impl.RankRepositoryImpl;
import app.repositories.impl.RoleRepositoryImpl;
import app.repositories.impl.UserRepositoryImpl;
import app.services.UserService;
import app.services.impl.UserServiceImpl;
import io.javalin.Javalin;
import io.javalin.plugin.bundled.CorsPluginConfig;

public class BackendApplication {
    private static final Javalin app = Javalin.create(config -> {
        config.showJavalinBanner = false;
        config.bundledPlugins.enableCors(cors -> {
            cors.addRule(CorsPluginConfig.CorsRule::anyHost);
        });
    });
    private static final Injector injector = new Injector();

    private static void handleDependencyInjection(){
        UserRepositoryImpl userRepositoryImpl = new UserRepositoryImpl();
        RoleRepositoryImpl roleRepositoryImpl = new RoleRepositoryImpl();
        RankRepositoryImpl rankRepositoryImpl = new RankRepositoryImpl();

        injector.bindSingleton(UserRepositoryImpl.class, userRepositoryImpl);
        injector.bindSingleton(UserRepository.class, userRepositoryImpl);

        injector.bindSingleton(RoleRepositoryImpl.class, roleRepositoryImpl);
        injector.bindSingleton(RoleRepository.class, roleRepositoryImpl);

        injector.bindSingleton(RankRepositoryImpl.class, rankRepositoryImpl);
        injector.bindSingleton(RankRepository.class, rankRepositoryImpl);

        UsersMapper usersMapper = new UsersMapper();
        injector.bindSingleton(UsersMapper.class, usersMapper);

        UserServiceImpl userServiceImpl = new UserServiceImpl(
                injector.get(UserRepository.class),
                injector.get(RoleRepository.class),
                injector.get(RankRepository.class));
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
