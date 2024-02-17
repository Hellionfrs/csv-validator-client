import Button from "../Button/Button";
import s from "./Input.module.css";

export default function Input({ fieldErrors, fields, id, row }) {
  console.log(fieldErrors);
  console.log(fields);
  
  return (
    <>
      <form className={s["input-form"]} key={id}>
        <span className={s.row}>{row}</span>
        {Object.entries(fields).map(([key, value], index) => (
          <input
            key={`${index}-${key - value}`}
            defaultValue={value}
            className={key in fieldErrors ? s.red : ""}
          />
        ))}
        <Button className={s["summit-row"]} size="sm" variant="secondary">
          Summit!
        </Button>
      </form>
    </>
  );
}
