import React from "react";

const Form = ({
  children,
  onSubmit,
  className,
}: {
  children: React.ReactNode;
  onSubmit: () => void;
  className?: string;
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={className}
    >
      {children}
    </form>
  );
};

export default Form;
