import React from 'react';
import * as R from 'ramda';
import { Link, To } from 'react-router-dom';

type buttonProps = {
  to?: To,
  text: string,
  colorless?: boolean,
  hidden?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

const Button = ({
  to = '', text, colorless = false, hidden = false, onClick,
}: buttonProps) => {
  const style = 'px-8 py-2 capitalize rounded-md ease-out transition-all font-medium';
  const visibility = hidden ? 'hidden' : 'visible';
  const buttonStyle = colorless ? 'bg-neutral-700' : 'bg-vin-500';

  const buttonProp = (
    <button
      type="button"
      className={`${style} ${buttonStyle} ${visibility}`}
      onClick={onClick}
    >
      {text}
    </button>
  );

  const linkProp = (
    <Link
      to={to}
      className={`${style} ${buttonStyle} ${visibility}`}
    >
      {text}
    </Link>
  );

  return R.isNil(to) ? buttonProp : linkProp;
};

export default Button;
