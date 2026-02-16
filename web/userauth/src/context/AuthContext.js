import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Define the fetcher logic so both login and refresh can use it
  const fetchUserDetails = useCallback(async (token) => {
    try {
      const response = await axios.get("http://localhost:8081/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      return true;
    } catch (error) {
      console.error("Fetch User Details Failed:", error);
      logout();
      return false;
    }
  }, []);

  // 2. Refresh Logic: Runs when the page is reloaded
  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        // We HAVE a token, so we MUST wait for the server 
        // before we allow the app to render.
        await fetchUserDetails(token);
      }
      
      // Only set loading to false AFTER the check is done
      setLoading(false);
    };

    validateSession();
  }, [fetchUserDetails]);

  // 3. Login Logic: Triggered by your Landing/Login page
  const login = async (tokenString) => {
    localStorage.setItem("token", tokenString);
    // This will fetch the details and set the 'user' state IMMEDIATELY
    await fetchUserDetails(tokenString);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};