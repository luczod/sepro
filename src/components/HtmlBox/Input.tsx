import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", name = "", ...rest }, ref) => {
    return (
      <>
        <input type={type} name={name} {...rest} ref={ref} />
      </>
    );
  }
);
