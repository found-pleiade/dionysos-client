import React from "react";

const PlaceItemsCenter = ({
  children,
  fullscreen,
}: {
  children: React.ReactNode;
  fullscreen?: boolean;
}) => (
  <div
    className={`grid place-items-center ${
      fullscreen ? "w-screen h-screen" : ""
    }`}
  >
    {children}
  </div>
);

export default PlaceItemsCenter;
