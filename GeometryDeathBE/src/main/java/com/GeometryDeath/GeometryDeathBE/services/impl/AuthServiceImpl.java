package com.GeometryDeath.GeometryDeathBE.services.impl;

import com.GeometryDeath.GeometryDeathBE.configs.security.JwtGenerator;
import com.GeometryDeath.GeometryDeathBE.models.entities.Role;
import com.GeometryDeath.GeometryDeathBE.models.entities.User;
import com.GeometryDeath.GeometryDeathBE.repositories.RoleRepository;
import com.GeometryDeath.GeometryDeathBE.repositories.UserRepository;
import com.GeometryDeath.GeometryDeathBE.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;

public class AuthServiceImpl implements AuthService {

    UserRepository userRepository;
    RoleRepository roleRepository;
    JwtGenerator jwtGenerator;
    AuthenticationManager authenticationManager;

    @Override
    public ResponseEntity<String> createTemporaryAccount(String username) {
        User user = new User();
        user.setUsername(username);

        Role roles = roleRepository.findByName("GUEST").
                orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRoles(Collections.singletonList(roles));
        userRepository.save(user);

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(),
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
