package app.repositories;

import app.models.entity.Role;

import java.util.Optional;

public interface RoleRepository {

    Optional<Role> findByCode(String code);
}
