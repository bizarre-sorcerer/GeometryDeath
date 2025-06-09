package app.services.impl;

import app.mappers.UsersMapper;
import app.models.dtos.UserDTO;
import app.repositories.UserRepository;
import app.services.UserService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UsersMapper usersMapper;

    public void createGuestUser(UserDTO userDTO){
        userRepository.save(usersMapper.toEntity(userDTO));
    }
}
