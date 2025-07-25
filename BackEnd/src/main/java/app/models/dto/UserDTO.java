package app.models.dto;

import app.models.entity.Rank;
import app.models.entity.Role;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserDTO {
    private String username;
    private String email;
    private String password;
    private Role role;
    private Rank rank;
    private Boolean isAnonymous;
    private Boolean verified;
    private Integer record;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
