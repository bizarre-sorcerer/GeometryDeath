package app.services.impl;

import app.models.entity.Rank;
import app.models.entity.Role;
import app.models.entity.User;
import app.presentation.dto.request.CreateGuestAccountDTO;
import app.presentation.dto.request.UpgradeGuestAccountDTO;
import app.repositories.RankRepository;
import app.repositories.RoleRepository;
import app.repositories.UserRepository;
import app.services.AuthService;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private RankRepository rankRepository;

    public void createGuestUser(CreateGuestAccountDTO userDTO){
        Role role = roleRepository.findByCode("GUEST")
                .orElseThrow(() -> new RuntimeException("Guest role not found"));

        Rank rank = rankRepository.findByCode("NOOB")
                .orElseThrow(() -> new RuntimeException("Noob rank not found"));

        User guestUser = new User();
        guestUser.setUsername(userDTO.getUsername());
        guestUser.setRole(role);
        guestUser.setRank(rank);
        guestUser.setCreatedAt(LocalDateTime.now());

        System.out.println("Guest user: " + guestUser);

        userRepository.save(guestUser);
    }

    public void upgradeGuestUser(UpgradeGuestAccountDTO userDTO){
        User user = userRepository.findByUsername(userDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found with given username"));

        Role role = roleRepository.findByCode("PLAYER")
                .orElseThrow(() -> new RuntimeException("Guest role not found"));

        user.setRole(role);
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setUpdatedAt(LocalDateTime.now());

        System.out.println( "Upgraded user: " + user);

        userRepository.save(user);
    }
}
