import { CheckIcon } from "@heroicons/react/solid";
import React, { Children } from "react";
import { Link, To } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { isLenZero } from "../utils";

const Button = ({
  id,
  className,
  title,
  type = "button",
  to = "",
  colorless,
  onClick,
  disabled,
  children,
  headless,
  loading,
  success,
}: {
  id?: string;
  className?: string;
  title?: string;
  type?: string;
  to?: To;
  colorless?: boolean;
  onClick?: any;
  disabled?: boolean;
  children?: React.ReactNode;
  headless?: boolean;
  loading?: boolean;
  success?: boolean;
}) => {
  // Return an empty button element if there are no children.
  // Used for navigation buttons when needing a single right aligned button.
  if (Children.toArray(children).length <= 0) return <div role="none" />;

  // Tailwind classes based on props. Classes added later override
  // earlier classes style.
  const style = () => {
    if (headless) return className;

    const base =
      "min-w-[12ch] h-10 grid place-items-center px-8 py-2 rounded-md ease-out transition-colors font-medium dark:text-dark-secondary whitespace-nowrap text-light-primary-100 bg-light-accent-500 hover:bg-light-accent-400 dark:bg-dark-accent-500 dark:hover:bg-dark-accent-400";

    const c = colorless
      ? "text-light-secondary bg-light-primary-300 hover:bg-light-primary-300/80 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500"
      : "";

    const d = disabled ? "cursor-not-allowed opacity-50" : "";

    const s = success ? "bg-light-success-400 dark:bg-dark-success-500" : "";

    return `${base} ${c} ${d} ${s} ${className}`;
  };

  const buttonState = () => {
    if (loading) {
      return <ClipLoader size="18px" color="white" />;
    }

    if (success) {
      return <CheckIcon className="text-white w-6 h-6" />;
    }

    return children;
  };

  const buttonTag = (
    <button
      id={id}
      type={type}
      className={style()}
      onClick={onClick}
      title={title}
      tabIndex={0}
      disabled={disabled}
    >
      {buttonState()}
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
      {buttonState()}
    </Link>
  );

  return isLenZero(to as string) || disabled ? buttonTag : linkComp;
};

export default Button;
