import { AuthProvider} from "../../context/authContext";
import { Outlet } from "react-router-dom";

function App() {

  // useEffect(() => {
  //   fetch("http://localhost:5000/")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data));
  // }, []);
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
