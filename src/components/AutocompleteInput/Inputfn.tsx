import { forwardRef, useId, ComponentProps } from "react";

// type InputProps = InputHTMLAttributes<HTMLInputElement>;

interface IInputProps extends ComponentProps<"input"> {}

export const Inputfn = forwardRef<HTMLInputElement, IInputProps>(
  ({ name, ...rest }, ref) => {
    const inputId = useId();

    return <input {...rest} id={inputId} name={name} ref={ref} />;
  }
);
