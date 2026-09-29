import { createContext, useContext, useState } from "react";
import api from "../utils";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!sessionStorage.getItem("adminToken")
  );

  const login = async(email, password) => {
    try {
      const data = await api.post("/api/admin/login", {
        email: email.trim(),
        password
      });

      sessionStorage.setItem("adminToken", data.token);
      setIsLoggedIn(true);
      return {ok : true};
    } catch (err) {
      if (err.response?.status === 429) {
        return { ok: false, message: "Too many attempts. Try again later." };
      }
      if (err.response?.status === 401) {
        return { ok: false, message: "Invalid Email or Password." };
      }
      return { ok: false, message: "Server not reachable. Try again." };
    }
    
  };

  return(
    <AuthContext.Provider value={{isLoggedIn, login}}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);