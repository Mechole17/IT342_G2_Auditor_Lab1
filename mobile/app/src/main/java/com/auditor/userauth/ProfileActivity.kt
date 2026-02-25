package com.auditor.userauth

import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import com.auditor.userauth.api.RetrofitClient
import com.auditor.userauth.model.UserDetailsDTO
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProfileActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_profile)

        val tvFirstName = findViewById<TextView>(R.id.tvProfileFirstName)
        val tvLastName = findViewById<TextView>(R.id.tvProfileLastName)
        val tvEmail = findViewById<TextView>(R.id.tvProfileEmail)

        // 1. Get the token from SharedPreferences
        val sharedPref = getSharedPreferences("UserAuth", MODE_PRIVATE)
        val token = sharedPref.getString("JWT_TOKEN", null)

        if (token != null) {
            // 2. Call the protected /api/user/me endpoint
            // We prepend "Bearer " because that's what the backend JwtFilter expects
            RetrofitClient.instance.getProfile("Bearer $token").enqueue(object : Callback<UserDetailsDTO> {
                override fun onResponse(call: Call<UserDetailsDTO>, response: Response<UserDetailsDTO>) {
                    if (response.isSuccessful) {
                        val user = response.body()
                        // Update UI with values from UserDetailsDTO
                        tvFirstName.text = user?.firstname
                        tvLastName.text = user?.lastname
                        tvEmail.text = user?.email
                    } else {
                        Toast.makeText(this@ProfileActivity, "Failed to load profile data", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<UserDetailsDTO>, t: Throwable) {
                    Toast.makeText(this@ProfileActivity, "Network Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        } else {
            Toast.makeText(this, "Session expired. Please login again.", Toast.LENGTH_SHORT).show()
            finish()
        }
    }
}