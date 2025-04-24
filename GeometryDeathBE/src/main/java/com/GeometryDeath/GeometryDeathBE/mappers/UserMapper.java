package com.GeometryDeath.GeometryDeathBE.mappers;

import com.GeometryDeath.GeometryDeathBE.models.dtos.UserDTO;
import com.GeometryDeath.GeometryDeathBE.models.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserDTO userDTO);

    UserDTO toUserDTO(User user);
}
