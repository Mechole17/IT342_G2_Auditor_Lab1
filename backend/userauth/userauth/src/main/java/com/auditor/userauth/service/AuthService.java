package com.auditor.userauth.service;

import com.auditor.userauth.entity.User;
import com.auditor.userauth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        Optional<?> existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()){
            throw new RuntimeException("Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }
}
