import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

type FileInputProps = {
  id: string;
  label?: string;
  accept?: string;
  onChange?: (files: File[]) => void;
  className?: string;
};

type FilePreview = {
  id: string;
  file: File;
  name: string;
  url: string;
};

const FileInput = ({
  className,
  id,
  label = "파일 선택",
  accept = "image/*",
  onChange,
}: FileInputProps) => {
  const [previewFiles, setPreviewFiles] = useState<FilePreview[]>([]);

  // 파일 삭제 함수
  const handleRemoveFile = (targetId: string) => {
    setPreviewFiles((prev) => {
      const targetFile = prev.find((file) => file.id === targetId);

      if (targetFile) {
        URL.revokeObjectURL(targetFile.url);
      }

      const nextFiles = prev.filter((file) => file.id !== targetId);

      onChange?.(nextFiles.map((file) => file.file));

      return nextFiles;
    });
  };

  useEffect(() => {
    return () => {
      previewFiles.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [previewFiles]);

  console.log("preview", previewFiles);

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

          const nextPreviewFiles = files.map((file) => ({
            id: `${crypto.randomUUID()}-${file.name}`,
            file,
            name: file.name,
            url: URL.createObjectURL(file),
          }));

          setPreviewFiles(nextPreviewFiles);
          onChange?.(files);

          e.target.value = "";
        }}
      />
      <div className="min-h-8 rounded-md border border-line-normal-neutral px-3 py-2 text-sm font-medium">
        {previewFiles.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {previewFiles.map((file) => (
              <li key={file.id} className="flex flex-col gap-2">
                <div className="relative aspect-3/2 w-full overflow-hidden rounded-md bg-neutral-90 -z-10">
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  <button
                    type="button"
                    aria-label={`${file.name} 삭제`}
                    onClick={() => handleRemoveFile(file.id)}
                    className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white cursor-pointer"
                  >
                    <FaXmark className="text-xs" />
                  </button>
                </div>

                <p className="truncate text-xs text-label-alternative">
                  {file.name}
                </p>
              </li>
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
