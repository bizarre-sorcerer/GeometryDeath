package app;

import io.javalin.Javalin;

public class Main {

    public static void main(String[] args){
        Javalin app = Javalin.create(config -> {
            config.showJavalinBanner = false;
        }).start(8080);

        app.get("/", context -> context.result("Geometry Death BackEnd"));
    }
}
