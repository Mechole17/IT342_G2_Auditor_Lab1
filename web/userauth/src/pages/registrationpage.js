import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert("Password must be at least 8 characters long and include both letters and numbers.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/api/auth/register", formData);
      alert("Registration Successful!");
      navigate("/");
      console.log(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Email already used.";
      alert(errorMessage);
      setFormData(prev => ({ ...prev, email: "", password: "", confirmPassword: "" }));
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join us by filling out the details below</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required style={styles.input} />
            <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required style={styles.input} />
          </div>

          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={styles.input} />

          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={{ marginTop: "20px", fontSize: "14px", textAlign: "center", color: "#666" }}>
            Already have an account? <Link to="/" style={{ color: "#000", fontWeight: "600", textDecoration: "none" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontFamily: "'Inter', system-ui, sans-serif",
    backgroundColor: "#ffffff"
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    textAlign: "center"
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#1a1a1a"
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "32px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  row: {
    display: "flex",
    gap: "12px"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  },
  button: {
    marginTop: "8px",
    padding: "12px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  }
};