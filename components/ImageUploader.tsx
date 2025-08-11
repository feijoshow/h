
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imagePreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imagePreviewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleAreaClick}
      className="w-full h-80 border-4 border-dashed border-stone-300 rounded-lg flex items-center justify-center text-center p-4 cursor-pointer hover:border-brand-green hover:bg-green-50 transition-all duration-300"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      {imagePreviewUrl ? (
        <img src={imagePreviewUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-md" />
      ) : (
        <div className="text-stone-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-lg font-semibold">Click to upload an image</p>
          <p className="text-sm">PNG, JPG, WEBP up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
