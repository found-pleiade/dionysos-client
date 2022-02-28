import React from 'react';

type roomInputProps = {
  text: string,
  placeholder: string,
  onClick: any,
  onChange?: any,
  groupClassName?: string,
  buttonClassName?: string,
}

const RoomInput = ({
  text, placeholder, onClick, onChange, groupClassName, buttonClassName,
}: roomInputProps) => (
  <div className={`flex ${groupClassName}`}>
    <input type="text" placeholder={placeholder} onChange={onChange} className="rounded-l-md px-3 py-1 text-neutral-900 w-full transition" />
    <button type="button" onClick={onClick} className={`rounded-r-md px-3 py-1 w-24 transition-colors ${buttonClassName}`}>{text}</button>
  </div>
);

export default RoomInput;
