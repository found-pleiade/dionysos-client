import React from "react";

const RowGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex space-x-1 w-full">{children}</div>
);

export default RowGroup;
