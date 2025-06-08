package app.core;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;

public class Injector {
    private final Map<Class<?>, Object> singletons = new HashMap<>();
    private final Map<Class<?>, Supplier<?>> providers = new HashMap<>();

    public <T> void bindSingleton(Class<T> clazz, T instance) {
        singletons.put(clazz, instance);
    }

    @SuppressWarnings("unchecked")
    public <T> T get(Class<T> clazz) {
        if (singletons.containsKey(clazz)) {
            return (T) singletons.get(clazz);
        }
        throw new RuntimeException("No binding for class: " + clazz);
    }
}
