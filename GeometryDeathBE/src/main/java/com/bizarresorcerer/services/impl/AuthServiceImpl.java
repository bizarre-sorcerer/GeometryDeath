package com.bizarresorcerer.services.impl;

import com.bizarresorcerer.models.entities.Role;
import com.bizarresorcerer.models.entities.User;
import com.bizarresorcerer.repositories.RoleRepository;
import com.bizarresorcerer.repositories.UserRepository;
import com.bizarresorcerer.services.AuthService;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.HttpResponse;
import jakarta.inject.Singleton;
import lombok.AllArgsConstructor;

import java.util.Collections;
import java.util.Optional;


@AllArgsConstructor
@Singleton
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public HttpResponse<String> createGuestAccount(String username) {
        Optional<User> user =  userRepository.findByUsername(username);
        if (user.isPresent()) {
            return HttpResponse.status(HttpStatus.CONFLICT).body("Account with this username already exists");
        }

        User newUser = new User();
        newUser.setUsername(username);

        Role roles = roleRepository.findByName("GUEST").
                orElseThrow(() -> new RuntimeException("Role not found"));
        newUser.setRoles(Collections.singletonList(roles));
        userRepository.save(newUser);

        // jwt auth to do

        String token = "";
        return HttpResponse.ok(token);
    }
}
