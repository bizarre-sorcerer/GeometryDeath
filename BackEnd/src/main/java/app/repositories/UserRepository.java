package app.repositories;

import app.models.entity.User;

public interface UserRepository {

    void save(User user);

    User findById(Long id);
}