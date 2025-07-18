package app.repositories;

import app.models.entity.User;

import java.util.Optional;

public interface UserRepository {

    void save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);
}