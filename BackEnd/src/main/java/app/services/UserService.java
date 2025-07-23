package app.services;

import app.models.dto.UserDTO;
import app.presentation.dto.response.ResponseEntity;

public interface UserService {

    ResponseEntity<UserDTO> getUserByUsername(String username);
}
