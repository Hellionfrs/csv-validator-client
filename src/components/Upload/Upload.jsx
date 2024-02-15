import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import s from "./Upload.module.css";
import Button from "../Button/Button";

export default function Upload() {
  const { isAuthenticated, logout } = useAuth();
  console.log(isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });
  return (
    <section>
      <div className={s.header}>You are Authenticated sir!</div>
      <Button
        className={s.logout}
        size="sm"
        variant="seconday"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </section>
  );
}
