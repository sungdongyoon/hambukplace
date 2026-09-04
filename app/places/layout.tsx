import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-screen-lg py-10 px-5 md:py-20 sm:px-10">
      {children}
    </div>
  );
};

export default layout;
