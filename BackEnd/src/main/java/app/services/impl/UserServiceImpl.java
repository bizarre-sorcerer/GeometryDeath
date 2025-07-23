package app.services.impl;

import app.config.mappers.UsersMapper;
import app.models.dto.UserDTO;
import app.models.entity.User;
import app.presentation.dto.response.ResponseEntity;
import app.repositories.UserRepository;
import app.services.UserService;

import java.util.Optional;

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UsersMapper usersMapper;

    public UserServiceImpl(UserRepository userRepository, UsersMapper usersMapper) {
        this.userRepository = userRepository;
        this.usersMapper = usersMapper;
    }

    @Override
    public ResponseEntity<UserDTO> getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()){
            System.out.println("User not found by username: " + username);
            return ResponseEntity.error("User not found");
        }
        System.out.println("User found: " + user.get());
        System.out.println("UserDTO: " + user.get());
        UserDTO userDTO = usersMapper.toDTO(user.get());
        return ResponseEntity.success(userDTO);
    }
}
