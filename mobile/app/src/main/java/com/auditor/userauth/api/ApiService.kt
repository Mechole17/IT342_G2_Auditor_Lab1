package com.auditor.userauth.api

import com.auditor.userauth.model.LoginRequestDTO
import com.auditor.userauth.model.LoginResponseDTO
import com.auditor.userauth.model.RegistrationRequestDTO
import com.auditor.userauth.model.User
import com.auditor.userauth.model.UserDetailsDTO
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST


interface ApiService {
    // Matches @PostMapping("/login") in AuthController.java
    @POST("api/auth/login")
    fun login(@Body request: LoginRequestDTO): Call<LoginResponseDTO>

    // Matches @PostMapping("/register") in AuthController.java
    @POST("api/auth/register")
    fun register(@Body request: RegistrationRequestDTO): Call<User>

    // In ApiService.kt
    @GET("api/user/me")
    fun getProfile(@Header("Authorization") token: String): Call<UserDetailsDTO>
}