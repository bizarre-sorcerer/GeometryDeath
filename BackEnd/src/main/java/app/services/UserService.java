package app.services;

import app.presentation.dto.request.CreateGuestAccountRequest;

public interface UserService {

    void createGuestUser(CreateGuestAccountRequest request);
}
