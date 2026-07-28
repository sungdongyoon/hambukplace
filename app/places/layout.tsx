import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-screen-lg py-20 px-5">{children}</div>;
};

export default layout;
