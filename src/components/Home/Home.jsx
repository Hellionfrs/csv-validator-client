import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Unauthenticated from "../Unauthenticated";
import s from "./Home.module.css";
import Button from "../Button/Button";
function Home() {
  const { isAuthenticated, logout } = useAuth();
  console.log(isAuthenticated);
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>CSV Validator!</h1>
      <p className={s.description}>Upload you csv and check if they are ok!</p>
      <div className={s.buttons}>
        {isAuthenticated ? (
          <>
            <Link to="/upload">
              <Button>Upload</Button>
            </Link>
            <Link>
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
            </Link>
          </>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
