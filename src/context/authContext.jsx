import React from "react";
import { baseUrl } from "../constants";

export const authContext = React.createContext({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(window.localStorage.getItem("tokenKey") || false);
  const [isAdmin, setIsAdmin] = React.useState(window.localStorage.getItem("tokenKey") || false);
  React.useEffect(() => {
    console.log("executing use Effect inside AuthProvider")
    const savedToken = window.localStorage.getItem("tokenKey");
    const savedAdminToken = window.localStorage.getItem("tokenKey");
    if (savedToken) {
      setIsAuthenticated(true);
    }
    if (savedAdminToken) {
      setIsAdmin(true);
    }
  }, []);
  async function login(email, password) {
    const options = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(options);
    const response = await fetch(baseUrl + "/login", options);
    console.log(response);
    if (response.ok) {
      const { data } = await response.json(); // jwt
      console.log(data.token);
      console.log(data.role)
      if (data.role === "admin") {
        window.localStorage.setItem("adminTokenKey", data.token);
        setIsAdmin(true);
      }
      window.localStorage.setItem("tokenKey", data.token);
      setIsAuthenticated(true);
      console.log("SettingIsauthenticated to true");
    } else {
      const body = await response.json();
      const error =
        body.message instanceof Array ? body.errors.join(", ") : body.message;
      console.log(error);
      return Promise.reject(new Error(error));
    }
  }

  async function signup(email, password) {
    const options = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(baseUrl + "/signup", options);

    if (response.ok) {
      const { token } = await response.json();
      window.localStorage.setItem("tokenKey", token);
      // TODO if signup is admin (not possible but...)
      setIsAuthenticated(true);
      return;
    } else {
      const body = await response.json();
      const error =
        body.errors instanceof Array ? body.errors.join(", ") : body.errors;
      return Promise.reject(new Error(error));
    }
  }

  function logout() {
    window.localStorage.removeItem("tokenKey");
    window.localStorage.removeItem("adminTokenKey");
    setIsAuthenticated(false);
    setIsAdmin(false);
  }

  return (
    <authContext.Provider
      value={{ isAuthenticated, isAdmin, login, signup, logout }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(authContext);
}
