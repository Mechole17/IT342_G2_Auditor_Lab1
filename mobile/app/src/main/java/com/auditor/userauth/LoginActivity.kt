package com.auditor.userauth

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.auditor.userauth.api.RetrofitClient
import com.auditor.userauth.model.LoginRequestDTO
import com.auditor.userauth.model.LoginResponseDTO
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // 1. Check SharedPreferences for an existing session
        val sharedPref = getSharedPreferences("UserAuth", MODE_PRIVATE)
        val savedToken = sharedPref.getString("JWT_TOKEN", null)

        if (savedToken != null) {
            // Token exists! Redirect to Home immediately
            val intent = Intent(this, HomeActivity::class.java)
            startActivity(intent)
            finish() // Close LoginActivity so the user can't go back to it
            return // Stop the rest of onCreate from running
        }

        // 2. If no token, continue to show the Login UI setContentView(R.layout.activity_login)
        setContentView(R.layout.activity_login)

        // 1. Find the views by the IDs you defined in your XML
        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val register = findViewById<TextView>(R.id.registerlink)
        val btnLogin = findViewById<Button>(R.id.btnLogin)

        register.setOnClickListener {
            // 3. Create the Intent (From this context, go to RegisterActivity)
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
        // 2. Add logic to the Login button
        btnLogin.setOnClickListener {
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter email and password", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Prepare the Request DTO
            val loginRequest = LoginRequestDTO(email, password)

            // Make the API Call
            RetrofitClient.instance.login(loginRequest).enqueue(object : Callback<LoginResponseDTO> {
                override fun onResponse(call: Call<LoginResponseDTO>, response: Response<LoginResponseDTO>) {
                    if (response.isSuccessful) {
                        val loginResponse = response.body()

                        // Save the token securely for later use
                        with(sharedPref.edit()) {
                            putString("JWT_TOKEN", loginResponse?.token)
                            putString("USER_EMAIL", loginResponse?.email)
                            apply()
                        }

                        Toast.makeText(this@LoginActivity, "Login Successful!", Toast.LENGTH_SHORT).show()

                        // Navigate to Home/Dashboard
                        val intent = Intent(this@LoginActivity, HomeActivity::class.java)
                        startActivity(intent)
                        finish()
                    } else {
                        Toast.makeText(this@LoginActivity, "Invalid email or password", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<LoginResponseDTO>, t: Throwable) {
                    Log.e("API_ERROR", "Login failed: ${t.message}")
                    Toast.makeText(this@LoginActivity, "Server Connection Error", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}