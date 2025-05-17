package com.bizarresorcerer.models.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    public String username;
    private String email;
    private String password;
    private Boolean verified;
    public Integer record;
}
