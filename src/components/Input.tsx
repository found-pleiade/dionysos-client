import React from 'react';
import { isValid, isValidConditions, visibility } from '../utils';

const Input = ({
  id,
  className,
  placeholder,
  onChange,
  onKeyPress,

  value,
  setValue,
  noHelper,
}: {
  id: string,
  className?: string,
  placeholder?: string,
  onChange?: any,
  onKeyPress?: any,

  value?: any,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  noHelper?: boolean,
}) => {
  /**
   * Differents conditions for the helper.
   */
  const gteThree = isValidConditions.gteThree(value);
  const lteTwenty = isValidConditions.lteTwenty(value);

  /**
   * Helper visibility boolean.
   */
  const showHelper = (!isValid(value) && !noHelper) && value.length > 0;

  /**
   * Adapt input style to the helper visibility.
   */
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
      <p className="absolute top-2 left-3 font-medium cursor-text text-background-400/70 unclickable transition-all duration-200 placeholder">{placeholder}</p>

      <div className={`absolute z-10 bg-background-600 w-full rounded-b-lg px-3 py-2 flex flex-col mt-1 font-bold text-sm ${visibility(showHelper)}`}>
        <p className={`text-error ${visibility(!gteThree)}`}>3 characters min.</p>
        <p className={`text-error ${visibility(!lteTwenty)}`}>20 characters max.</p>
      </div>
    </div>
  );
};

export default Input;
