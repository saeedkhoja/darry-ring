import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("yagona_token");
    if (token) {
      auth
        .me(token)
        .then((u) => u && setUser({ ...u, token }))
        .catch(() => localStorage.removeItem("yagona_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // OneID orqali kirish (mock yoki real). Backend ulansa exchangeCode
  // ishlatiladi; mock rejimda mockOneIdLogin chaqiriladi.
  async function loginWithOneId(form) {
    const u = await auth.mockOneIdLogin(form);
    localStorage.setItem("yagona_token", u.token);
    setUser(u);
    return u;
  }

  function logout() {
    localStorage.removeItem("yagona_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loginWithOneId, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
