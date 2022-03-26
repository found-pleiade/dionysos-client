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
  const base = 'px-8 py-2 rounded-md ease-out transition-colors font-medium text-foreground';
  const visibility = hidden ? 'hidden' : 'visible';

  const colorsAndCursor = () => {
    if (disabled && colorless) return 'bg-background-600/40 hover:bg-background-600/40 cursor-not-allowed';
    if (colorless) return 'bg-background-600 hover:bg-background-500 cursor-pointer';
    if (disabled) return 'bg-accent-500/40 hover:bg-accent-500/40 cursor-not-allowed';
    return 'bg-accent-500 hover:bg-accent-400 focus:outline-pending cursor-pointer';
  };

  const style = `${base} ${visibility} ${colorsAndCursor()}`;

  const buttonProp = (
    <button
      type="button"
      className={`${style} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );

  const linkProp = (
    <Link
      to={to}
      className={`${style} ${className}`}
      onClick={onClick}
    >
      {text}
    </Link>
  );

  return !isValid(to as string) || disabled ? buttonProp : linkProp;
};

export default Button;
