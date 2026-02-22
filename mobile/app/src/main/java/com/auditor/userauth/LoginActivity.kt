package com.auditor.userauth

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

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
            // Simple validation check
            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter email and password", Toast.LENGTH_SHORT).show()
            } else {
                // 3. Navigate to HomeActivity
                val intent = Intent(this, HomeActivity::class.java)
                startActivity(intent)

                // Optional: close LoginActivity so user can't go back to it
                finish()
            }
        }
    }
}