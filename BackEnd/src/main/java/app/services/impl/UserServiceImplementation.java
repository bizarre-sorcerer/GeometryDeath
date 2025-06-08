package app.services.impl;

import app.models.dtos.CreateGuestUserDTO;
import app.services.UserService;

public class UserServiceImplementation implements UserService {

    public void createGuestUser(CreateGuestUserDTO createGuestUserDTO){
        System.out.println("creating guest account");
    }
}
