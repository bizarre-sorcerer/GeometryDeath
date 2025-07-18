package app.services;

import app.presentation.dto.request.CreateGuestAccountDTO;
import app.presentation.dto.request.UpgradeGuestAccountDTO;

public interface AuthService {

    void createGuestUser(CreateGuestAccountDTO request);

    void upgradeGuestUser(UpgradeGuestAccountDTO request);
}
