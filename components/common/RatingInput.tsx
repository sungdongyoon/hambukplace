import { FaStar } from "react-icons/fa6";

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
};

const RatingInput = ({ value, onChange }: RatingInputProps) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    // 클릭 위치 half 구분
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isHalf = clickX < rect.width / 2;

    const nextValue = isHalf ? index + 0.5 : index + 1;

    onChange(nextValue);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-flex">
        <div className="flex text-line-normal-neutral">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} className="text-[1.4rem]" />
          ))}
        </div>

        <div
          className="absolute left-0 top-0 flex overflow-hidden text-yellow-400"
          style={{ width: `${(value / 5) * 100}%` }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} className="shrink-0 text-[1.4rem]" />
          ))}
        </div>

        <div className="absolute left-0 top-0 flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              type="button"
              className="h-[1.4rem] w-[1.4rem] cursor-pointer"
              aria-label={`${index + 1}점`}
              onClick={(e) => handleClick(e, index)}
            />
          ))}
        </div>
      </div>

      <span className="w-8 text-sm font-semibold">{value}</span>
    </div>
  );
};

export default RatingInput;
