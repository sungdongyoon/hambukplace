import React from "react";

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="w-full h-full flex justify-center items-center border border-line-normal-neutral rounded-lg">
      <p className="font-medium text-[0.9rem]">{message}</p>
    </div>
  );
};

export default EmptyState;
