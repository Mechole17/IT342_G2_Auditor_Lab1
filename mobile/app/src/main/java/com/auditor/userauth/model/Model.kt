package com.auditor.userauth.model

// Matches LoginRequestDTO.java
data class LoginRequestDTO(
    val email: String,
    val password: String
)

// Matches LoginResponseDTO.java
data class LoginResponseDTO(
    val token: String,
    val email: String
)

// Matches RegistrationRequestDTO.java
data class RegistrationRequestDTO(
    val firstname: String,
    val lastname: String,
    val email: String,
    val password: String
)

data class User(
    val userid: Long?,
    val firstname: String,
    val lastname: String,
    val email: String,
    // We typically don't return the password from the backend for security
    val password: String? = null,
)

data class UserDetailsDTO(
    val firstname: String,
    val lastname: String,
    val email: String,
)