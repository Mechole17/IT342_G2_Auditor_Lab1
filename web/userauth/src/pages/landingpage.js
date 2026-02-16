import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function LandingPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Use the same port/URL pattern as your registration
      const response = await axios.post("http://localhost:8081/api/user/auth/login", loginData);
      
      // 1. Save the user to LocalStorage using authcontext login function
      login(response.data); 
      alert("Login Successful!");
      navigate("/dashboard"); // Or wherever your main page is
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid email or password.";
      alert(errorMessage);
      
      // Clear password on failure
      setLoginData(prev => ({ ...prev, password: "" }));
    }
  };

  return (
    <div style={styles.page}>
      {/* Left Side: Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>User Authentication & Registration</h1>
        <p style={styles.heroText}>
          A system for secure user management and access control.
        </p>
      </div>

      {/* Right Side: Login Section */}
      <div style={styles.loginSection}>
        <div style={styles.loginCard}>
          <h2 style={styles.loginTitle}>Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={loginData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>login</button>
          </form>
        <p style={styles.footerText}>
            Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#fff",
  },
  heroSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 10%",
    backgroundColor: "#fafafa", // Light contrast
    borderRight: "1px solid #eee",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "800",
    lineHeight: "1.1",
    color: "#111",
    marginBottom: "20px",
  },
  heroText: {
    fontSize: "18px",
    color: "#666",
    maxWidth: "400px",
    lineHeight: "1.6",
  },
  loginSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginCard: {
    width: "100%",
    maxWidth: "320px",
    padding: "20px",
  },
  loginTitle: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "24px",
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#888",
  },
  link: {
    color: "#000",
    fontWeight: "600",
    textDecoration: "none",
  }
};