import type { CanvasRefHandle } from '@/features/drawing/types/drawing';
import DrawingForm from '@/features/drawing/ui/DrawingForm';
import { useEffect, useRef, useState, type Dispatch } from 'react';
import ImageAddSVG from '@/assets/icon/image-add.svg';
import React from 'react';
import { gsap } from 'gsap';

interface Props {
  selectedChkbox: string | null;
  chkboxContentRef: React.RefObject<HTMLDivElement | null>;
  drawingRef: React.RefObject<CanvasRefHandle | null>;
  setImageFile: Dispatch<React.SetStateAction<File | null>>;
  imageFile: File | null;
  onDrawChange?: (hasDrawing: boolean) => void;
}

function FeedOptionsSection({
  selectedChkbox,
  chkboxContentRef,
  drawingRef,
  setImageFile,
  imageFile,
  onDrawChange,
}: Props) {
  const [isDragActive, setIsDragActive] = useState(false);
  const drawingContainerRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    gsap.to(drawingContainerRef.current, {
      opacity: selectedChkbox === 'drawing' ? 1 : 0,
      duration: 0.3,
      ease: 'power1.inOut',
      pointerEvents: selectedChkbox === 'drawing' ? 'auto' : 'none',
    });
    gsap.to(imageContainerRef.current, {
      opacity: selectedChkbox === 'image' ? 1 : 0,
      duration: 0.3,
      ease: 'power1.inOut',
      pointerEvents: selectedChkbox === 'image' ? 'auto' : 'none',
    });
  }, [selectedChkbox]);

  return (
    <div
      ref={chkboxContentRef}
      id="feedsContent"
      role="region"
      aria-live="polite"
      tabIndex={0}
      aria-label="선택된 옵션"
      className={`w-full border-t-1 border-dashed border-gray-dark order-3 transition-all duration-500 ease-in-out focus:ring-none ${selectedChkbox ? 'max-h-[62.5rem] opacity-100 mt-3 pt-2' : 'opacity-0 max-h-0'}`}
    >
      <div ref={drawingContainerRef} className="opacity-0 oveflow-hidden">
        {selectedChkbox === 'drawing' && (
          <DrawingForm drawingRef={drawingRef} onDrawChange={onDrawChange} />
        )}
      </div>
      <div ref={imageContainerRef} className="opacity-0 oveflow-hidden">
        {selectedChkbox === 'image' && (
          <div className="">
            <label
              htmlFor="feedOptions-imageInput"
              className="cursor-pointer w-full"
            >
              <div
                className={`flex gap-2 flex-col w-full h-[232px] rounded-[20px] items-center justify-center relative transition-colors duration-200 overflow-hidden
          ${
            imageFile
              ? 'border-0'
              : isDragActive
                ? 'border-2 border-dashed border-blue-500 bg-blue-100'
                : 'border border-gray-dark border-dashed'
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
                {!imageFile ? (
                  // 🔹 이미지가 없을 때: 업로드 안내
                  <>
                    <img src={ImageAddSVG} alt="이미지 추가 버튼" />
                    <p className="text-[16px] max-w-[174px] text-center text-gray-dark">
                      이미지를 드래그나 클릭해서 업로드 해주세요
                    </p>
                  </>
                ) : (
                  // 🔹 이미지가 있을 때: 미리보기 + hover 시 삭제 버튼
                  <div className="relative group w-full h-full">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="미리보기"
                      className="w-full h-full object-contain rounded-[20px]"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); // label 클릭 방지
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center 
                w-8 h-8 rounded-full bg-black/60 text-white text-lg font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* 파일 업로드 input */}
                <input
                  type="file"
                  accept="image/*"
                  id="feedOptions-imageInput"
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
    </div>
  );
}
export default React.memo(FeedOptionsSection);
