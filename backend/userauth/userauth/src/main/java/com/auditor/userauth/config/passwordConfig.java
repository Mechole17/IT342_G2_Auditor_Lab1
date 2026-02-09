package com.auditor.userauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class passwordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Higher strength (10 is default) makes hashing slower/more secure
        return new BCryptPasswordEncoder(10);
    }
}
