package app.presentation.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpgradeGuestAccountDTO {
    String username;
    String email;
    String password;
}
