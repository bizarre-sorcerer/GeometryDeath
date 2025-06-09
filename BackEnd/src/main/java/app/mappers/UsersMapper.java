package app.mappers;

import app.models.dtos.UserDTO;
import app.models.entities.User;

public class UsersMapper {

    public User toEntity(UserDTO userDTO){
        if (userDTO == null){
            return null;
        }

        User user = new User();

        user.setUsername( userDTO.getUsername() );

        return user;
    };

    public UserDTO toDTO(User user){
        if (user == null){
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );
        userDTO.setUsername( user.getUsername() );

        return userDTO;
    }

}
