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
  type?: "button" | "submit";
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
      "grid place-items-center ease-out transition-colors whitespace-nowrap text-light-accent-400 dark:text-dark-accent-400";

    const c = colorless
      ? "text-light-secondary-900 dark:text-dark-secondary-100"
      : "";

    const d = disabled ? "cursor-not-allowed opacity-50" : "";

    return `${base} ${c} ${d} ${className}`;
  };

  const buttonState = () => {
    if (loading) {
      const color = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#fff"
        : "#000";

      return <ClipLoader size="18px" color={color} />;
    }

    if (success) {
      return <CheckIcon className="text-black dark:text-white w-6 h-6" />;
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
      type={type}
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
