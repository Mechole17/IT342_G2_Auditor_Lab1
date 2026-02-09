package com.auditor.userauth.controller;

import com.auditor.userauth.entity.User;
import com.auditor.userauth.service.AuthService;
import jakarta.validation.Valid;
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




}
