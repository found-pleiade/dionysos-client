import React from "react";

const CenterCard = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center space-y-3 p-10 rounded-none md:rounded-md max-w-3xl">
    <div className="font-semibold text-xl text-center">{children}</div>
  </div>
);

export default CenterCard;
