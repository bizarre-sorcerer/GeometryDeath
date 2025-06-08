package app.services;

import app.models.dtos.CreateGuestUserDTO;

public interface UserService {

    void createGuestUser(CreateGuestUserDTO createGuestUserDTO);
}
