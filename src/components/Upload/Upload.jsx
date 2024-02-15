import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import s from "./Upload.module.css";
import Button from "../Button/Button";

export default function Upload() {
  // TODO check if user roles is admin
  const { isAuthenticated, isAdmin, logout } = useAuth();
  console.log(isAuthenticated);
  console.log(isAdmin)
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });
  return (
    <section>
      {isAdmin ? (
        <div className={s.header}>You are Authenticated sir!</div>
      ) : (
        <div className={s.header}>You need Super powers to watch this</div>
      )}

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
