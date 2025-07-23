package app.services.impl;

import app.config.mappers.UsersMapper;
import app.models.dto.UserDTO;
import app.models.entity.Rank;
import app.models.entity.Role;
import app.models.entity.User;
import app.presentation.dto.request.CreateGuestAccountDTO;
import app.presentation.dto.request.UpgradeGuestAccountDTO;
import app.presentation.dto.response.ResponseEntity;
import app.repositories.RankRepository;
import app.repositories.RoleRepository;
import app.repositories.UserRepository;
import app.services.AuthService;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Optional;

@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private RankRepository rankRepository;
    private UsersMapper usersMapper;

    public ResponseEntity<UserDTO> createGuestUser(CreateGuestAccountDTO userDTO){
        Optional<User> user = userRepository.findByUsername(userDTO.getUsername());
        if (user.isPresent()){
            System.out.println("Account with such username already exists");
            return ResponseEntity.error("Account with such username already exists");
        }

        Optional<Role> role = roleRepository.findByCode("GUEST");
        if (role.isEmpty()){
            System.out.println("Role GUEST not found");
            return ResponseEntity.error("Role GUEST not found");
        }

        Optional<Rank> rank = rankRepository.findByCode("NOOB");
        if (rank.isEmpty()){
            System.out.println("Rank NOOB not found");
            return ResponseEntity.error("Rank NOOB not found");
        }

        User guestUser = new User();
        guestUser.setUsername(userDTO.getUsername());
        guestUser.setRole(role.get());
        guestUser.setRank(rank.get());
        guestUser.setIsAnonymous(false);
        guestUser.setCreatedAt(LocalDateTime.now().withNano((LocalDateTime.now().getNano() / 1_000_000) * 1_000_000));

        System.out.println("Guest user: " + guestUser);
        userRepository.save(guestUser);

        return ResponseEntity.success(usersMapper.toDTO(guestUser));
    }

    public ResponseEntity<UserDTO> upgradeGuestUser(UpgradeGuestAccountDTO userDTO){
        Optional<User> user = userRepository.findByUsername(userDTO.getUsername());
        if (user.isEmpty()){
            System.out.println("User not found by given username: " + userDTO.getUsername());
            return ResponseEntity.error("User not found by given username");
        }

        Optional<Role> role = roleRepository.findByCode("PLAYER");
        if (role.isEmpty()){
            System.out.println("Role PLAYER not found");
            return ResponseEntity.error("Role PLAYER not found");
        }

        user.ifPresent(u -> {
            u.setRole(role.get());
            u.setEmail(userDTO.getEmail());
            u.setPassword(userDTO.getPassword());
            u.setIsAnonymous(true);
            u.setVerified(false);
            u.setUpdatedAt(LocalDateTime.now());
        });

        System.out.println( "Upgraded user: " + user);
        return ResponseEntity.success(usersMapper.toDTO(user.get()));
    }
}
