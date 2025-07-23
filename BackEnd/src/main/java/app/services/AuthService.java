package app.services;

import app.models.dto.UserDTO;
import app.presentation.dto.request.CreateGuestAccountDTO;
import app.presentation.dto.request.UpgradeGuestAccountDTO;
import app.presentation.dto.response.ResponseEntity;

public interface AuthService {

    ResponseEntity<UserDTO> createGuestUser(CreateGuestAccountDTO request);

    ResponseEntity<UserDTO> upgradeGuestUser(UpgradeGuestAccountDTO request);
}
