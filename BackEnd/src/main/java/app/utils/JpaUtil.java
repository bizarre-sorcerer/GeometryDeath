package app.utils;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.HashMap;
import java.util.Map;

public class JpaUtil {
    private static final EntityManagerFactory emf;

    static {
        Map<String, String> props = new HashMap<>();

        String jdbcUrl = System.getenv("JDBC_POSTGRES_URI");

        if (jdbcUrl != null && !jdbcUrl.isEmpty()) {
            props.put("jakarta.persistence.jdbc.url", jdbcUrl);
        } else {
            props.put("jakarta.persistence.jdbc.url", "jdbc:postgresql://localhost:5432/geometry_death_db");
            props.put("jakarta.persistence.jdbc.user", "root_aidar");
            props.put("jakarta.persistence.jdbc.password", "asdf");
        }

        props.put("jakarta.persistence.jdbc.driver", "org.postgresql.Driver");
        emf = Persistence.createEntityManagerFactory("main-pu", props);
    }

    public static EntityManagerFactory getEntityManagerFactory() {
        return emf;
    }

    public static void close() {
        emf.close();
    }
}
