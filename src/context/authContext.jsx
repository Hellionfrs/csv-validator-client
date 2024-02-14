import React from "react";
import { baseUrl } from "../constants";

export const authContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const savedToken = window.localStorage.getItem("tokenKey");

    if (savedToken) {
      setIsAuthenticated(true);
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
      console.log(data.token)
      window.localStorage.setItem("tokenKey", data.token);
      setIsAuthenticated(true);
      console.log("SettingIsauthenticated to true")
    } else {
      const body = await response.json();
      const error =
        body.errors instanceof Array ? body.errors.join(", ") : body.errors;
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
      window.localStorage.setItem(tokenKey, token);
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
    window.localStorage.removeItem(tokenKey);
    setIsAuthenticated(false);
  }

  return (
    <authContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(authContext);
}
