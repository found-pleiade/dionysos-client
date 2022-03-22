import React from 'react';

type inputProps = {
  className?: string,
  placeholder?: string,
  value?: any,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  onChange?: any,
}

const Input = ({
  className, placeholder, value, setValue, onChange,
}: inputProps) => (
  <input
    tabIndex={0}
    className={`cursor-text transition-colors ease-out bg-foreground text-background-900 font-medium px-3 py-2 rounded-md flex items-center justify-between w-full ${className}`}
    type="text"
    value={value}
    onChange={(event) => {
      if (setValue) setValue(event.target.value);
      if (onChange) onChange(event);
    }}
    placeholder={placeholder}
  />
);

export default Input;
