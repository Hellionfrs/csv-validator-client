import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);
  return (
    <div>
      <h1>Test de Hola mundo</h1>
      <pre>{JSON.stringify(message, null, 2)}</pre>
    </div>
  );
}

export default App;
