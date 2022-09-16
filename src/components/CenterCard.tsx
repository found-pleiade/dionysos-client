import React from "react";

const CenterCard = ({ children }: { children: React.ReactNode }) => (
  <div
    className="w-full max-w-3xl font-medium text-lg text-center
  bg-light-primary-200 dark:bg-dark-primary-800 p-4 sm:rounded-md"
  >
    {children}
  </div>
);

export default CenterCard;
