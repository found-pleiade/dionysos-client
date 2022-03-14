import { CheckIcon, ExclamationIcon } from '@heroicons/react/solid';
import React from 'react';
import * as R from 'ramda';

type inputProps = {
  value: any,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  isValid?: boolean
}

const Input = ({ value, setValue, isValid }: inputProps) => {
  const validIcon = (
    <div className="transition-colors ease-out bg-green-100 text-green-600 px-3 py-2 rounded-r-md flex items-center justify-between ml-[2px]">
      <CheckIcon className="h-5 w-5" />
    </div>
  );

  const errorIcon = (
    <div className="transition-colors ease-out bg-red-100 text-red-600 px-3 py-2 rounded-r-md flex items-center justify-between ml-[2px]">
      <ExclamationIcon className="h-5 w-5" />
    </div>
  );

  const isValidIsDefined = R.not(R.isNil(isValid));
  const icon = isValid ? validIcon : errorIcon;
  const renderIcon = isValidIsDefined ? icon : <div />;

  const inputStyleIfIcon = isValidIsDefined ? 'rounded-l-md rounded-none' : '';

  return (
    <div className="mb-8 last:mb-0 flex">
      <input
        tabIndex={0}
        className={`cursor-text transition-colors ease-out bg-zinc-200 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-600 px-3 py-2 rounded-md flex items-center justify-between w-full ${inputStyleIfIcon}`}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      {renderIcon}
    </div>
  );
};

export default Input;
