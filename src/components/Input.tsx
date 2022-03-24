import React from 'react';
import { isValid, isValidConditions, visibility } from '../utils';

type inputProps = {
  id?: string,
  className?: string,
  placeholder?: string,
  value?: any,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  onChange?: any,
  onKeyPress?: any,
  noHelper?: boolean,
}

const Input = ({
  id, className, placeholder, value, setValue, onChange, onKeyPress, noHelper,
}: inputProps) => {
  const gteThree = isValidConditions.gteThree(value);
  const lteTwenty = isValidConditions.lteTwenty(value);

  const showHelper = (!isValid(value) && !noHelper) && value.length > 0;
  const inputWithHelperStyle = showHelper ? 'rounded-b-none' : '';

  return (
    <div className="w-full relative">
      <input
        id={id}
        tabIndex={0}
        className={`input cursor-text transition-colors bg-foreground text-background-900 font-medium px-3 py-2 w-full rounded-md ${inputWithHelperStyle} ${className}`}
        type="text"
        value={value}
        onChange={(event) => {
          if (setValue) setValue(event.target.value);
          if (onChange) onChange(event);
        }}
        onKeyPress={onKeyPress}
        placeholder={' '}
      />
      <p className="absolute top-2 left-3 font-medium cursor-text text-background-400/70 unclickable transition-all placeholder">{placeholder}</p>

      <div className={`absolute z-10 bg-foreground text-background-900 w-full rounded-b-lg px-3 py-2 flex flex-col space-y-1 border-t-2 mt-1 font-medium text-sm ${visibility(showHelper)}`}>
        <p className={`text-error ${visibility(!gteThree)}`}>At least 3 characters</p>
        <p className={`text-error ${visibility(!lteTwenty)}`}>Over 20 characters</p>
      </div>
    </div>
  );
};

export default Input;
