import React from 'react';
import { Link, To } from 'react-router-dom';
import { isValid } from '../utils';

type buttonProps = {
  id?: string,
  className?: string,
  to?: To,
  colorless?: boolean,
  hidden?: boolean,
  onClick?: any,
  disabled?: boolean,
  children: React.ReactNode,
}

/**
 * Basic button component, 'text' is the text inside the button,
 * 'to' is a React Router Link used to navigate to a new page.
 */
const Button = ({
  id,
  className,
  to = '',
  colorless,
  hidden,
  onClick,
  disabled,
  children,
}: buttonProps) => {
  const base = 'px-8 py-2 rounded-md ease-out transition-colors font-medium text-foreground whitespace-nowrap';
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
      id={id}
      type="button"
      className={`${style} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const linkProp = (
    <Link
      id={id}
      to={to}
      className={`${style} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return !isValid(to as string) || disabled ? buttonProp : linkProp;
};

export default Button;
