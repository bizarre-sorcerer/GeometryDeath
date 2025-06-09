package app.repositories;

import app.models.entities.User;

public interface UserRepository {
    void save(User user);
    User findById(Long id);
}