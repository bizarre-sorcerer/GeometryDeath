package app.services;

import app.presentation.dto.request.CreateGuestAccountDTO;
import app.presentation.dto.request.UpgradeGuestAccountDTO;
import app.presentation.dto.response.ResponseEntity;

public interface AuthService {

    ResponseEntity createGuestUser(CreateGuestAccountDTO request);

    ResponseEntity upgradeGuestUser(UpgradeGuestAccountDTO request);
}
