import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) return null; // Wait for storage check
  if (!user) {
    return (
      <div style={styles.unauthorizedContainer}>
        <div style={styles.unauthorizedCard}>
          <h2 style={styles.unauthorizedTitle}>Access Denied</h2>
          <p style={styles.unauthorizedText}>
            You need to be logged in to view your audit dashboard.
          </p>
          <button 
            onClick={() => navigate("/")} 
            style={styles.unauthorizedButton}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>USER AUTH</div>
        
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
              <h3>Welcome back, {user.firstname}!</h3>
              <p>Here is an overview of your recent audit activities.</p>
            </div>
          ) : (
            <div style={styles.profileContainer}>
    {/* Profile Header/Avatar */}
    <div style={styles.profileHeader}>
      <div style={styles.avatar}>
        {user.firstname?.charAt(0)}{user.lastname?.charAt(0)}
      </div>
      <div>
        <h3 style={styles.profileName}>{user.firstname} {user.lastname}</h3>
        <p style={styles.profileRole}>Standard User</p>
      </div>
    </div>

    {/* Information Cards */}
      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <span style={styles.infoLabel}>First Name</span>
          <span style={styles.infoValue}>{user.firstname}</span>
        </div>
        <div style={styles.infoCard}>
          <span style={styles.infoLabel}>Last Name</span>
          <span style={styles.infoValue}>{user.lastname}</span>
        </div>
        <div style={styles.infoCard}>
          <span style={styles.infoLabel}>Email Address</span>
          <span style={styles.infoValue}>{user.email}</span>
        </div>
      </div>
    </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
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
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  avatar: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
  },
  profileName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
  },
  profileRole: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: "16px 20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  infoLabel: {
    fontSize: "12px",
    color: "#9ca3af",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  infoValue: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#111827",
  },
  unauthorizedContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9fafb",
  },
  unauthorizedCard: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "90%",
  },
  unauthorizedTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 8px 0",
  },
  unauthorizedText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  unauthorizedButton: {
    padding: "12px 24px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};