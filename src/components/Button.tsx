import { CheckIcon } from "@heroicons/react/solid";
import React, { Children } from "react";
import { ClipLoader } from "react-spinners";

const Button = ({
  id,
  className,
  title,
  type = "button",
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
  colorless?: boolean;
  onClick?: any;
  disabled?: boolean;
  children?: React.ReactNode;
  headless?: boolean;
  loading?: boolean;
  success?: boolean;
}) => {
  // Tailwind classes based on props.
  const style = () => {
    if (headless) return className;

    const base =
      "grid place-items-center ease-out transition-colors whitespace-nowrap text-light-accent-400 dark:text-dark-accent-400";

    const c = colorless
      ? "!text-light-secondary-900 dark:!text-dark-secondary-100"
      : "";

    const d = disabled ? "cursor-not-allowed opacity-50" : "";

    return `${base} ${c} ${d} ${className}`;
  };

  // Override children when showing a state
  const content = () => {
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

  return (
    <button
      id={id}
      type={type}
      className={style()}
      onClick={onClick}
      title={title}
      tabIndex={0}
      disabled={disabled}
    >
      {content()}
    </button>
  );
};

export default Button;
