import React from 'react';

type inputProps = {
  id?: string,
  className?: string,
  placeholder?: string,
  value?: any,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  onChange?: any,
  onKeyPress?: any,
}

const Input = ({
  id, className, placeholder, value, setValue, onChange, onKeyPress,
}: inputProps) => (
  <input
    id={id}
    tabIndex={0}
    className={`cursor-text transition-colors ease-out bg-foreground text-background-900 font-medium px-3 py-2 rounded-md flex items-center justify-between w-full ${className}`}
    type="text"
    value={value}
    onChange={(event) => {
      if (setValue) setValue(event.target.value);
      if (onChange) onChange(event);
    }}
    placeholder={placeholder}
    onKeyPress={onKeyPress}
  />
);

export default Input;
