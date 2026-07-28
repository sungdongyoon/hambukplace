import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-screen-lg">{children}</div>;
};

export default layout;
