import { useCallback, useEffect, useRef, useState, type Dispatch } from 'react';
import React from 'react';
import { useCloseOnOutsideOrEsc } from '@/shared/hook/useCloseOnOutsideOrEsc';
import Button from '../button/Button';
import FeedOptions from './FeedOptions';
import type { FeedType } from '@/shared/types/feed';
import FeedOptionsSection from './FeedOptionsSection';
import type { CanvasRefHandle } from '@/features/drawing/types/drawing';

interface Props {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
  onSubmit: () => Promise<void>;
  setType: Dispatch<React.SetStateAction<FeedType>>;
  drawingRef: React.RefObject<CanvasRefHandle | null>;
  type: FeedType;
  imageFile: File | null;
  setImageFile: Dispatch<React.SetStateAction<File | null>>;
}

function FeedInput({
  content,
  setContent,
  onSubmit,
  setType,
  drawingRef,
  type,
  imageFile,
  setImageFile,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [textareaText, setTextareaText] = useState('');
  const [selectedChkbox, setSelectedChkbox] = useState<string | null>(null);
  const feedsInputRef = useRef<HTMLDivElement>(null);
  const chkboxContentRef = useRef<HTMLDivElement | null>(null);
  const textLength = 200;

  /* textarea 글자 수만큼 height 늘어나도록 */
  const handleTextareaAutoSize = () => {
    if (!textareaRef.current) return;

    const minHeight = 48; // 기본 높이(px)

    if (!textareaRef.current.value) {
      textareaRef.current.style.height = `${minHeight}px`;
    } else {
      textareaRef.current.style.height = `${minHeight}px`; // 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  /* textarea 글자 수 표시(감소 형태) */
  const handleCountText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.slice(0, textLength));
    handleTextareaAutoSize();
  };

  /* 옵션 선택 시 */
  const handleSelect = useCallback((id: string | null) => {
    setSelectedChkbox(id);
    // 피드 타입
    setType(id ? (id as FeedType) : 'text');
  }, []);

  /* 훅 이용 (esc or 밖 클릭 시 FeedsInput 축소) */
  useCloseOnOutsideOrEsc<HTMLDivElement>({
    ref: feedsInputRef,
    onClose: () => setIsFocused(false),
  });

  /* checkbox 클릭 시 그 내용으로 focus 이동 */
  useEffect(() => {
    if (selectedChkbox && chkboxContentRef.current) {
      chkboxContentRef.current.focus();
    }
  }, [selectedChkbox]);

  useEffect(() => {
    if (!selectedChkbox) {
      setType('text');
    }
  });

  const handleSubmit = async () => {
    try {
      if (selectedChkbox === 'drawing' && !drawingRef.current) {
        return;
      }
      await onSubmit();
      setSelectedChkbox(null);
      setType('text');
    } catch (error) {
      console.error(error);
    }
  };

  // 엔터
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter: 개행
        return;
      } else {
        e.preventDefault();
        await onSubmit();
        setSelectedChkbox(null);
        setType('text');
      }
    }
  };

  return (
    <div
      ref={feedsInputRef}
      className="flex flex-col px-5 py-3 rounded-xl bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.20)] mb-10"
    >
      <div className="flex flex-col relative w-full ">
        <textarea
          ref={textareaRef}
          name="feedsInput"
          value={content}
          maxLength={textLength}
          onChange={handleCountText}
          onFocus={() => {
            (setIsFocused(true), handleTextareaAutoSize());
          }}
          placeholder="익명으로 자유롭게 의견을 나눠보세요."
          onKeyDown={handleKeyDown}
          className="pr-7 py-3 w-full h-[3rem] resize-none overflow-hidden focus:outline-none"
        ></textarea>
        <span
          className={`block absolute right-0 bottom-0 ml-auto text-gray-dark transition-opacity duration-300 ease-in-out ${isFocused ? 'opacity-100' : 'opacity-0'}`}
        >
          {textLength - content.length}
        </span>
      </div>
      <div
        className={`flex flex-wrap items-center gap-2 md:gap-0 transition-height duration-300 ease-in-out ${isFocused || selectedChkbox ? 'overflow-visible max-h-[62.5rem] pt-5' : 'overflow-hidden max-h-0'}`}
      >
        <FeedOptions selected={selectedChkbox} onSelect={handleSelect} />

        <FeedOptionsSection
          selectedChkbox={selectedChkbox}
          chkboxContentRef={chkboxContentRef}
          drawingRef={drawingRef}
          setImageFile={setImageFile}
          imageFile={imageFile}
        />

        <div className="ml-auto relative group inline-block ">
          <Button
            size="sm"
            color="blue"
            onClick={handleSubmit}
            disabled={type === 'text' && content.length <= 0}
            className="
              relative overflow-hidden isolate z-0
              enabled:active:translate-y-[2px]
              before:content-[''] before:absolute before:inset-y-0 before:left-0
              before:w-0 before:h-full
              before:transition-[width] before:duration-500 before:ease-in-out
              before:bg-primary-light
              before:shadow-[-7px_-7px_20px_0px_#fff9,_-4px_-4px_5px_0px_#fff9,_7px_7px_20px_0px_#0002,_4px_4px_5px_0px_#0001]
              before:-z-10
              enabled:hover:before:w-full
              disabled:before:!w-0 disabled:shadow-none
              "
          >
            올리기
          </Button>
          {/*툴팁*/}
          {type === 'text' && content.length <= 0 && (
            <span
              className="
              absolute left-1/2 -translate-x-1/2 top-full mt-1
              whitespace-nowrap rounded-md
              bg-black text-white text-xs px-2 py-1
              opacity-0 group-hover:opacity-100 transition-opacity
            "
            >
              내용을 입력해주세요
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
export default React.memo(FeedInput);
