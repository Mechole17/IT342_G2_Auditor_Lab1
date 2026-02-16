package com.auditor.userauth.controller;

import com.auditor.userauth.dto.LoginRequestDTO;
import com.auditor.userauth.entity.User;
import com.auditor.userauth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public User createUser(@Valid @RequestBody User user){

        return authService.createUser(user);
    }

    // backend/userauth/.../controller/AuthController.java

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequestDto, HttpServletRequest request) {
        // Authenticate using the AuthService
        boolean isAuthenticated = authService.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());

        if (isAuthenticated) {
            // Create a new session (true ensures one is created if it doesn't exist)
            HttpSession session = request.getSession(true);
            session.setAttribute("user_email", loginRequestDto.getEmail());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }




}
