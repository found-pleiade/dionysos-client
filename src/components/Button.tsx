import React from 'react';
import { Link, To } from 'react-router-dom';
import * as R from 'ramda';

/**
 * Basic button component, 'text' is the text inside the button,
 * 'to' is a React Router Link used to navigate to a new page.
 */
const Button = ({
  id,
  className,
  title,
  to = '',
  colorless,
  hidden,
  onClick,
  onKeyPress,
  disabled,
  children,
}: {
  id?: string,
  className?: string,
  title?: string,
  to?: To,
  colorless?: boolean,
  hidden?: boolean,
  onClick?: any,
  onKeyPress?: any,
  disabled?: boolean,
  children: React.ReactNode,
}) => {
  const base = 'px-8 py-2 rounded-md ease-out transition-colors font-medium dark:text-dark-secondary whitespace-nowrap';

  const visibility = hidden ? 'hidden' : 'visible';

  const colorsAndCursor = () => {
    if (disabled && colorless) return 'dark:bg-dark-dominant-600/40 dark:hover:bg-dark-dominant-600/40 cursor-not-allowed';
    if (colorless) return 'dark:bg-dark-dominant-600 dark:hover:bg-dark-dominant-500 cursor-pointer';
    if (disabled) return 'dark:bg-dark-accent-500/40 dark:hover:bg-dark-accent-500/40 cursor-not-allowed';
    return 'dark:bg-dark-accent-500 dark:hover:bg-dark-accent-400 cursor-pointer';
  };

  const style = `${base} ${visibility} ${colorsAndCursor()}`;

  const buttonProp = (
    <button
      id={id}
      type="button"
      className={`${style} ${className}`}
      onClick={onClick}
      onKeyPress={onKeyPress}
      title={title}
      tabIndex={0}
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
      onKeyPress={onKeyPress}
      title={title}
      tabIndex={0}
    >
      {children}
    </Link>
  );

  return R.equals(R.length(to as string), 0) || disabled ? buttonProp : linkProp;
};

export default Button;
