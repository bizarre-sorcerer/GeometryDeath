package com.GeometryDeath.GeometryDeathBE.repositories;

import com.GeometryDeath.GeometryDeathBE.models.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String username);

}
