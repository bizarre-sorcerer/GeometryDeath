package com.GeometryDeath.GeometryDeathBE.services;

import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<String   > createTemporaryAccount(String username);

}
