package app.services;

import app.models.dtos.UserDTO;

public interface UserService {

    void createGuestUser(UserDTO userDTO);
}
