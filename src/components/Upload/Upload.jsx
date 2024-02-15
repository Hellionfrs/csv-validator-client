import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import s from "./Upload.module.css";
import Button from "../Button/Button";
import { csvFiletoArray, sendForm } from "../../utils/csvParser";

export default function Upload() {
  // TODO check if user roles is admin
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [dataValidated, setDataValidadted] = useState({
    success: [],
    errors: [],
  });
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const navigate = useNavigate();
  const fileReader = new FileReader();
  console.log(isAuthenticated);
  console.log(isAdmin);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  // posiblemente to backend

  const handleOnSummit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        const newArray = csvFiletoArray(text);
        setArray(newArray);
        sendForm(newArray)
          .then((data) => {
            console.log("succesful send the data");
            console.log("data filtered", data);
            setDataValidadted(data.data);
          })
          .catch((error) => {
            console.log("something went wrong sending the data", error);
          });
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });
  return (
    <section>
      {isAdmin ? (
        <>
          <header className={s.wrapper}>
            <div className={s.header}>You are Authenticated sir!</div>
            <div>
              <h1 className={s.title}>REACTJS CSV IMPORT EXAMPLE </h1>
              <form className={s["main-form"]}>
                <input
                  className={s["csv-input"]}
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
                />
                <Button
                  onClick={(e) => {
                    handleOnSummit(e);
                  }}
                >
                  Upload File
                </Button>
              </form>
            </div>
          </header>
          <article>
            <header>Succesful!</header>
            <table>
              <thead>
                <tr key={"header"}>
                  {headerKeys.map((key) => (
                    <th>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {dataValidated.success ? (
                  dataValidated.success.map((item) => (
                    <tr key={item.id}>
                      {Object.values(item).map((val) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <div>Nothing succesful</div>
                )}
              </tbody>
            </table>
          </article>
          <article>
            <header>To modify!</header>
            {dataValidated.errors.map((item) => (
              <div key={item.row}>
                <div>{item.row}</div>
                {Object.values(item.details).map((fields, index) => (
                  <span key={index}>{fields}</span>
                ))}
              </div>
            ))}
          </article>
        </>
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
