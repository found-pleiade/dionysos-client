import React from 'react';
import { Link, To } from 'react-router-dom';
import { isValid } from '../utils';

type buttonProps = {
  className?: string,
  to?: To,
  text: string,
  colorless?: boolean,
  hidden?: boolean,
  onClick?: any,
  disabled?: boolean,
}

const Button = ({
  className = '', to = '', text, colorless = false, hidden = false, onClick, disabled = false,
}: buttonProps) => {
  const style = 'px-8 py-2 rounded-md ease-out transition-all font-medium text-foreground';
  const visibility = hidden ? 'hidden' : 'visible';
  const cursor = disabled ? 'cursor-not-allowed bg-accent/40 hover:bg-accent/40' : 'cursor-pointer';
  const buttonStyle = colorless ? 'bg-accent/40' : 'bg-accent hover:bg-accent/80 transition-colors';

  const buttonProp = (
    <button
      type="button"
      className={`${style} ${buttonStyle} ${visibility} ${cursor} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );

  const linkProp = (
    <Link
      to={to}
      className={`${style} ${buttonStyle} ${visibility} ${className}`}
      onClick={onClick}
    >
      {text}
    </Link>
  );

  return !isValid(to as string) || disabled ? buttonProp : linkProp;
};

export default Button;
