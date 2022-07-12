import React from 'react';

const Input = ({
  id,
  className,
  placeholder,
  onChange,
  onKeyDown,

  value,
  setValue,
}: {
  id?: string,
  className?: string,
  placeholder?: string,
  onChange?: any,
  onKeyDown?: any,

  value?: any,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
}) => (
  <div className="w-full relative">
    <input
      id={id}
      tabIndex={0}
      className={`input cursor-text transition-colors text-light-secondary bg-light-primary-300 focus:bg-light-primary-300/[.8] dark:text-dark-primary-900 dark:bg-dark-secondary/[.87] dark:focus:bg-dark-secondary font-medium px-3 py-2 w-full rounded-md ${className}`}
      type="text"
      value={value}
      onChange={(event) => {
        if (setValue) setValue(event.target.value);
        if (onChange) onChange(event);
      }}
      onKeyDown={onKeyDown}
      placeholder={' '}
    />

    <p className="absolute top-2 left-3 font-medium cursor-text text-light-secondary/60 dark:text-dark-primary-400/70 pointer-events-none transition-all duration-200 placeholder">
      {placeholder}
    </p>
  </div>
);

export default Input;
