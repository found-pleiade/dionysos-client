import React from "react";

const CenterCard = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-3xl font-semibold text-xl text-center">{children}</div>
);

export default CenterCard;
