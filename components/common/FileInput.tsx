import React, { useState } from "react";

type FileInputProps = {
  id: string;
  label?: string;
  accept?: string;
  onChange?: (files: File[]) => void;
  className?: string;
};

const FileInput = ({
  className,
  id,
  label = "파일 선택",
  accept = "image/*",
  onChange,
}: FileInputProps) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <div>
      <label
        htmlFor={id}
        className={`inline-flex cursor-pointer bg-fill-normal rounded-sm py-2 px-4 mb-2 text-[0.8rem] font-semibold ${className}`}
      >
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);

          setFileNames(files.map((file) => file.name));
          onChange?.(files);
        }}
      />
      <div className="min-h-8 rounded-md border border-line-normal-neutral px-3 py-2 text-sm font-medium">
        {fileNames.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {fileNames.map((fileNames) => (
              <li key={fileNames}>{fileNames}</li>
            ))}
          </ul>
        ) : (
          <p>선택된 파일 없음</p>
        )}
      </div>
    </div>
  );
};

export default FileInput;
