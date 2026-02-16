import { useState, useContext } from "react"; // Added useContext
import { useNavigate } from "react-router-dom";
import { UserContext } from "../pages/UserContext"; // Ensure this path is correct

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Consume the user data and logout function from context
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    // Call the global logout from context
    logout();
    navigate("/");
  };

  // Prevent rendering if user data hasn't loaded yet
  if (!user) {
    return <div style={styles.container}>Loading profile...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>AUDITOR AI</div>
        
        <nav style={styles.nav}>
          <button 
            onClick={() => setActiveTab("overview")} 
            style={activeTab === "overview" ? styles.navItemActive : styles.navItem}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("profile")} 
            style={activeTab === "profile" ? styles.navItemActive : styles.navItem}
          >
            Profile
          </button>
        </nav>

        <div style={styles.sidebarFooter}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        </header>
        
        <section style={styles.contentBody}>
          {activeTab === "overview" ? (
            <div style={styles.card}>
              <h3>Welcome back, {user.firstName}!</h3> {/* Dynamic Name */}
              <p>Here is an overview of your recent audit activities.</p>
            </div>
          ) : (
            <div style={styles.card}>
              <h3>User Profile</h3>
              <div style={styles.profileInfo}>
                <p><strong>First Name:</strong> {user.firstName}</p> {/* Dynamic Data */}
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  // ... Keep all your existing styles
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "'Inter', sans-serif",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#fff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "40px",
    letterSpacing: "-0.5px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1,
  },
  navItem: {
    textAlign: "left",
    padding: "10px 14px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#4b5563",
  },
  navItemActive: {
    textAlign: "left",
    padding: "10px 14px",
    borderRadius: "6px",
    backgroundColor: "#f3f4f6",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    color: "#000",
  },
  sidebarFooter: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: "20px",
  },
  logoutButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  mainContent: {
    flexGrow: 1,
    overflowY: "auto",
    padding: "40px",
  },
  header: {
    marginBottom: "32px",
  },
  contentBody: {
    maxWidth: "800px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  // Added a small style for the profile layout
  profileInfo: {
    marginTop: "12px",
    lineHeight: "2",
    fontSize: "16px"
  }
};