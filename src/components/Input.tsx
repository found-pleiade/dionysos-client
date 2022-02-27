import React from 'react';

type inputProps = {
  value: any,
  setValue: React.Dispatch<React.SetStateAction<any>>
}

const Input = ({ value, setValue }: inputProps) => (
  <div className="mb-8 last:mb-0">
    <input
      tabIndex={0}
      className="cursor-text transition-colors ease-out bg-zinc-200 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-600 px-3 py-2 rounded-md flex items-center justify-between w-full"
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  </div>
);

export default Input;
