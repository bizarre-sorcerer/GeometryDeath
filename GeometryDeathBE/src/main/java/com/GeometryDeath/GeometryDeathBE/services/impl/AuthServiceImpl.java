package com.GeometryDeath.GeometryDeathBE.services.impl;

import com.GeometryDeath.GeometryDeathBE.configs.security.JwtGenerator;
import com.GeometryDeath.GeometryDeathBE.models.entities.Role;
import com.GeometryDeath.GeometryDeathBE.models.entities.User;
import com.GeometryDeath.GeometryDeathBE.repositories.RoleRepository;
import com.GeometryDeath.GeometryDeathBE.repositories.UserRepository;
import com.GeometryDeath.GeometryDeathBE.services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    UserRepository userRepository;
    RoleRepository roleRepository;
    JwtGenerator jwtGenerator;
    AuthenticationManager authenticationManager;

    @Override
    public ResponseEntity<String> createGuestAccount(String username) {
        Optional<User> user =  userRepository.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account with this username already exists");
        }

        User newUser = new User();
        newUser.setUsername(username);

        Role roles = roleRepository.findByName("GUEST").
                orElseThrow(() -> new RuntimeException("Role not found"));
        newUser.setRoles(Collections.singletonList(roles));
        userRepository.save(newUser);

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                newUser.getUsername(),
                "",
                Collections.singletonList(new SimpleGrantedAuthority("GUEST"))
        );

        Authentication auth = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtGenerator.generateToken(auth);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}
