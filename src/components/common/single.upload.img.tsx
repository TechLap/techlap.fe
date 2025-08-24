import "dropzone/dist/dropzone-min.js";
import "lodash";
import { useEffect, useState } from "react";

interface SingleUploadImgProps {
  onFileChange: (file: File | null) => void;
  isOpenActionModal: boolean;
  defaultImg?: string;
}

const SingleUploadImg = (props: SingleUploadImgProps) => {
  const { onFileChange, isOpenActionModal, defaultImg } = props;
  const [fileImg, setFileImg] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const urlStorageImg = process.env.REACT_APP_URL_STORAGE_FILE as string;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImg(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  const handleClear = () => {
    setFileImg(null);
    setFileName("");
    setPreviewUrl("");
    onFileChange(null);
  };

  useEffect(() => {
    if (!isOpenActionModal) {
      setFileImg(null);
      setFileName("");
      setPreviewUrl("");
      onFileChange(null);
    }
  }, [isOpenActionModal, onFileChange]);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-5">
      <div className="grow">
        <input
          type="file"
          onChange={handleChange}
          className="hidden"
          id="fileInput"
        />
        <div className="flex items-center gap-3">
          <label
            htmlFor="fileInput"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
            {defaultImg ? "Thay đổi ảnh" : "Chọn ảnh"}
          </label>
          {fileImg && (
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-gray-200 bg-white text-gray-500 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              onClick={handleClear}
            >
              Xóa
            </button>
          )}
        </div>
        {fileName && (
          <img src={previewUrl} alt={fileName} className="mt-2 max-w-[200px]" />
        )}
        {defaultImg && !fileName && (
          <img
            src={`${urlStorageImg}/productImgs/${defaultImg}`}
            alt={defaultImg}
            className="mt-2 max-w-[200px]"
          />
        )}
      </div>
    </div>
  );
};

export default SingleUploadImg;
