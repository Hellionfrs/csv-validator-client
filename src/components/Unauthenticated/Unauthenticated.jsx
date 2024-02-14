import * as React from "react";
import s from "./Unauthenticated.module.css";
import Button from "../Button/Button";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Unauthenticated() {
  const { login } = useAuth();

  const [status, setStatus] = React.useState("idle");
  const [signUpErrors, setSignUpErrors] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    // obtener datos del formulario
    const email = userEmail;
    const password = userPassword;
    console.log("email", userEmail);
    console.log("password", userPassword);
    setStatus("loading");

    // login and register TODO
    login(email, password)
      .then(() => {
        setStatus("success");
        console.log("succesfull login")
        navigate("/upload")
      })
      .catch((error) => setStatus(error));

    
  }

  const isLoading = status === "loading";
  const hasError = status === "error";

  return (
    <section className={s.section}>
      {/* Login Component reusable */}
      <div className={s.wrapper}>
        <h1 className={s.title}>Login!</h1>
        <form onSubmit={handleSubmit} className={s.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="user@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Enter"}
          </Button>
        </form>
        {hasError && (
          // TODO handling Error message per input
          <p className={s["error-message"]}>
            {signUpErrors || "Invalid Credentials"}
          </p>
        )}
      </div>
    </section>
  );
}

export default Unauthenticated;
