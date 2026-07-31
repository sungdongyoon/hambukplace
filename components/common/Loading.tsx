import { FaSpinner } from "react-icons/fa6";

const Loading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <FaSpinner role="status" aria-label="loading" className="animate-spin" />
      <p>{children ?? "Loading..."}</p>
    </div>
  );
};

export default Loading;
