package com.bizarresorcerer.services;

import io.micronaut.http.HttpResponse;

public interface AuthService {

    HttpResponse<String> createGuestAccount(String username);
}
