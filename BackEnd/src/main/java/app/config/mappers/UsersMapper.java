package app.config.mappers;

import app.models.dto.UserDTO;
import app.models.entity.User;

public class UsersMapper {

    public User toEntity(UserDTO userDTO){
        if (userDTO == null){
            return null;
        }

        User user = new User();

        user.setUsername( userDTO.getUsername() );
        user.setEmail( userDTO.getEmail() );
        user.setPassword( userDTO.getPassword() );
        user.setRole( userDTO.getRole() );
        user.setRank( userDTO.getRank() );
        user.setRecord( userDTO.getRecord() );
        user.setIsAnonymous( userDTO.getIsAnonymous() );
        user.setVerified(userDTO.getVerified() );
        user.setCreatedAt( userDTO.getCreatedAt() );
        user.setUpdatedAt( userDTO.getUpdatedAt() );

        return user;
    };

    public UserDTO toDTO(User user){
        if (user == null){
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setUsername( user.getUsername() );
        userDTO.setEmail( user.getEmail() );
        userDTO.setPassword( user.getPassword() );
        userDTO.setRole( user.getRole() );
        userDTO.setRank( user.getRank() );
        userDTO.setIsAnonymous( user.getIsAnonymous() );
        userDTO.setVerified( user.getVerified() );
        userDTO.setRecord( user.getRecord() );
        userDTO.setCreatedAt( user.getCreatedAt() );
        userDTO.setUpdatedAt( user.getUpdatedAt() );

        return userDTO;
    }

}
