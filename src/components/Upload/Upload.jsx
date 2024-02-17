import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import s from "./Upload.module.css";
import Button from "../Button/Button";
import { csvFiletoArray, sendForm } from "../../utils/csvParser";
import Input from "../Input";

export default function Upload() {
  // TODO check if user roles is admin
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [dataValidated, setDataValidated] = useState();
  const [dataWasValidated, setDataWasValidated] = useState(false);
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
            if (data.message) {
              throw new Error("usuario ya existe");
            }
            setDataValidated(data.data);
            setDataWasValidated(true);
          })
          .catch((error) => {
            setDataWasValidated(false);
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
  }, []);
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
          {dataWasValidated ? (
            <div>
              <article className={s["fields-wrapper"]}>
                <header className={s["error-header"]}>
                  Fix these fields first!
                </header>
                <div className={s["fields-name-column"]}>
                  <span key="row">Rows</span>
                  {headerKeys.map((key) => (
                    <span key={key}>{key}</span>
                  ))}
                </div>
              </article>
              <article className={s["fields-wrapper"]}>
                <header></header>
                {dataValidated.errors.map((item) => (
                  <div className={s["fields-name"]} key={item.row}>
                    <Input
                      row={item.row}
                      id={`${item.row}-${item.original.email}`}
                      fieldErrors={item.details}
                      fields={item.original}
                    />
                  </div>
                ))}
              </article>
            </div>
          ) : (
            <div className={s.header}>Upload your csv!</div>
          )}
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
