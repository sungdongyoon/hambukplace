import React from "react";

const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-[1.6rem] font-semibold mb-10">{children}</h2>;
};

export default PageTitle;
