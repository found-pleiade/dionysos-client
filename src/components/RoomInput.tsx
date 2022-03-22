import React from 'react';
import Button from './Button';
import Input from './Input';

type roomInputProps = {
  text: string,
  placeholder: string,
  onClick: any,
  onChange?: any,
  colorless?: boolean
}

const RoomInput = ({
  text, placeholder, onClick, onChange, colorless,
}: roomInputProps) => (
  <div className="flex">
    <Input className="rounded-r-none" placeholder={placeholder} onChange={onChange} />
    <Button colorless={colorless} className="rounded-l-none w-24 px-1" text={text} onClick={onClick} />
  </div>
);

export default RoomInput;
