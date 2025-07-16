package app.services.impl;

import app.models.entity.Rank;
import app.models.entity.Role;
import app.models.entity.User;
import app.presentation.dto.request.CreateGuestAccountRequest;
import app.repositories.RankRepository;
import app.repositories.RoleRepository;
import app.repositories.UserRepository;
import app.services.UserService;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private RankRepository rankRepository;

    public void createGuestUser(CreateGuestAccountRequest userDTO){
        Role role = roleRepository.findByCode("GUEST")
                .orElseThrow(() -> new RuntimeException("Guest role not found"));

        Rank rank = rankRepository.findByCode("NOOB")
                .orElseThrow(() -> new RuntimeException("Guest role not found"));

        User guestUser = new User();
        guestUser.setUsername(userDTO.getUsername());
        guestUser.setRole(role);
        guestUser.setRank(rank);
        guestUser.setCreatedAt(LocalDateTime.now());

        System.out.println("Guest user: " + guestUser);

        userRepository.save(guestUser);
    }
}
