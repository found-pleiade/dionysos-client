import React from "react";

const Input = ({
  id,
  className,
  placeholder,
  onChange,
  onKeyDown,
  disabled,

  value,
  setValue,
}: {
  id?: string;
  className?: string;
  placeholder?: string;
  onChange?: any;
  onKeyDown?: any;
  disabled?: boolean;

  value?: any;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
}) => (
  <div className="w-full relative">
    <input
      id={id}
      tabIndex={0}
      className={`input rounded-md cursor-text transition-colors text-light-secondary-900 bg-light-primary-200 dark:text-dark-secondary-100 dark:bg-dark-primary-800 px-4 py-2 w-full ${className}`}
      type="text"
      value={value}
      onChange={(event) => {
        if (setValue) setValue(event.target.value);
        if (onChange) onChange(event);
      }}
      onKeyDown={onKeyDown}
      placeholder={" "}
      disabled={disabled}
    />

    <p className="absolute top-2 left-4 cursor-text text-light-secondary-500 dark:text-dark-secondary-500 pointer-events-none transition-all duration-200 placeholder">
      {placeholder}
    </p>
  </div>
);

export default Input;
