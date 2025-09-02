import type { CanvasRefHandle } from '@/features/drawing/types/drawing';
import DrawingForm from '@/features/drawing/ui/DrawingForm';
import { useState, type Dispatch } from 'react';
import ImageAddSVG from '@/assets/icon/image-add.svg';

interface Props {
  selectedChkbox: string | null;
  chkboxContentRef: React.RefObject<HTMLDivElement | null>;
  drawingRef: React.RefObject<CanvasRefHandle | null>;
  setImageFile: Dispatch<React.SetStateAction<File | null>>;
}

function FeedOptionsSection({
  selectedChkbox,
  chkboxContentRef,
  drawingRef,
  setImageFile,
}: Props) {
  if (!selectedChkbox) return null;
  const [isDragActive, setIsDragActive] = useState(false);

  return (
    <div
      ref={chkboxContentRef}
      id="feedsContent"
      role="region"
      aria-live="polite"
      tabIndex={-1}
      aria-label="선택된 옵션"
      className="mt-3 pt-5 w-full border-t-1 border-dashed border-gray-dark order-3 focus:ring-none"
      style={{ maxHeight: selectedChkbox ? '62.5rem' : '0px' }}
    >
      {selectedChkbox === 'drawing' && <DrawingForm drawingRef={drawingRef} />}
      {selectedChkbox === 'image' && (
        <div className="">
          <p>사진 올리기</p>
          <label htmlFor="feedOptions-imageInput" className="cursor-pointer">
            <div
              // className="flex w-full bg-secondary h-[320px] items-center justify-center"
              className={`flex w-full h-[320px] rounded-[20px] items-center justify-center relative transition-colors duration-200 ${
                isDragActive
                  ? 'border-2 border-dashed border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-secondary'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragActive(false);
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                  setImageFile(file);
                }
              }}
            >
              <img src={ImageAddSVG} alt="이미지 추가 버튼" />
              <input
                type="file"
                accept="image/*"
                id={`feedOptions-imageInput`}
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
export default FeedOptionsSection;
