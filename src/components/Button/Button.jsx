import clsx from "clsx";
import s from "./Button.module.css";

function  Button({ size = "md", variant = "primary", className, children, ...delegated }) {
  const classNames = clsx(s.button, s[variant], s[size], className);

  return (
    <button className={classNames} {...delegated}>
      {children}
    </button>
  );
}

export default Button;
