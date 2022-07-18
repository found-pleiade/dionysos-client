import React, { Children } from 'react';
import { Link, To } from 'react-router-dom';
import { isLenZero } from '../utils';

const Button = ({
  id,
  className,
  title,
  to = '',
  colorless,
  onClick,
  disabled,
  children,
  headless,
}: {
  id?: string,
  className?: string,
  title?: string,
  to?: To,
  colorless?: boolean,
  onClick?: any,
  disabled?: boolean,
  children?: React.ReactNode,
  headless?: boolean,
}) => {
  // Return an empty button element if there are no children.
  // Used for navigation buttons when needing a single right aligned button.
  if (Children.toArray(children).length <= 0) return <div role="none" />;

  // Tailwind classes based on props. As observed, classes added later override
  // earlier classes style.
  const style = () => {
    if (headless) return className;

    const base = 'px-8 py-2 rounded-md ease-out transition-colors font-medium dark:text-dark-secondary whitespace-nowrap text-light-primary-100 bg-light-accent-500 hover:bg-light-accent-400 dark:bg-dark-accent-500 dark:hover:bg-dark-accent-400';

    const c = colorless ? 'text-light-secondary bg-light-primary-300 hover:bg-light-primary-300/80 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500' : '';

    const d = disabled ? 'cursor-not-allowed opacity-50' : '';

    return `${base} ${c} ${d} ${className}`;
  };

  const buttonTag = (
    <button
      id={id}
      type="button"
      className={style()}
      onClick={onClick}
      title={title}
      tabIndex={0}
      disabled={disabled}
    >
      {children}
    </button>
  );

  const linkComp = (
    <Link
      id={id}
      className={style()}
      onClick={onClick}
      title={title}
      tabIndex={0}
      to={to}
    >
      {children}
    </Link>
  );

  return isLenZero(to as string) || disabled ? buttonTag : linkComp;
};

export default Button;
