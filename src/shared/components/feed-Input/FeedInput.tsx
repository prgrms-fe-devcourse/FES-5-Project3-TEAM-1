import TextareaAutoSize from 'react-textarea-autosize';
import { useCallback, useEffect, useRef, useState, type Dispatch } from 'react';
import React from 'react';
import { useCloseOnOutsideOrEsc } from '@/shared/hook/useCloseOnOutsideOrEsc';
import Button from '../button/Button';
import FeedOptions from './FeedOptions';
import type { FeedType } from '@/shared/types/feed';
import FeedOptionsSection from './FeedOptionsSection';
import type { CanvasRefHandle } from '@/features/drawing/types/drawing';

interface FeedData {
  content?: string;
  drawingUrl?: string;
}

interface Props {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
  onSubmit: (data: FeedData) => void;
  setType: Dispatch<React.SetStateAction<FeedType>>;
}

function FeedInput({ content, setContent, onSubmit, setType }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  // const [textareaText, setTextareaText] = useState('');
  const [selectedChkbox, setSelectedChkbox] = useState<string | null>(null);
  const feedsInputRef = useRef<HTMLDivElement>(null);
  const chkboxContentRef = useRef<HTMLDivElement | null>(null);
  const drawingRef = useRef<CanvasRefHandle>(null);
  const textLength = 200;

  /* textarea 글자 수 표시(감소 형태) */
  const handleCountText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.slice(0, textLength));
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

  /* 올리기 */
  const handleSubmitFeed = () => {
    const drawingUrl = drawingRef.current?.changeToImage();

    onSubmit({
      content,
      drawingUrl: drawingUrl ?? undefined,
    });

    setSelectedChkbox(null);
  };

  // 엔터
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter: 개행
        return;
      } else {
        e.preventDefault();
        handleSubmitFeed();
      }
    }
  };

  const handleTestRef = () => {
    console.log('drawingRef.current:', drawingRef.current);
  };

  return (
    <div
      ref={feedsInputRef}
      className="flex flex-col p-5 rounded-xl bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.20)] mb-10"
    >
      <div className="flex flex-col relative w-full ">
        <TextareaAutoSize
          min-rows={1}
          name="feedsInput"
          value={content}
          maxLength={textLength}
          onChange={handleCountText}
          onFocus={() => setIsFocused(true)}
          placeholder="익명으로 자유롭게 의견을 나눠보세요."
          className="pr-7 py-3 w-full min-h-12 resize-none overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none"
          onKeyDown={handleKeyDown}
        ></TextareaAutoSize>
        {/* <img src="" alt="" className="block w-full max-w-[12.5rem]" /> */}
        <span
          className={`block absolute right-0 bottom-0 ml-auto text-gray-dark transition-opacity duration-300 ease-in-out ${isFocused ? 'opacity-100' : 'opacity-0'}`}
        >
          {textLength - content.length}
        </span>
      </div>
      <div
        className={`flex flex-wrap items-center gap-2 md:gap-0 transition-all duration-300 ease-in-out ${isFocused || selectedChkbox ? 'overflow-visible max-h-[62.5rem] pt-5' : 'overflow-hidden max-h-0'}`}
      >
        <FeedOptions selected={selectedChkbox} onSelect={handleSelect} />

        <FeedOptionsSection
          selectedChkbox={selectedChkbox}
          chkboxContentRef={chkboxContentRef}
          drawingRef={drawingRef}
        />

        <div className="ml-auto">
          <Button size="sm" color="blue" onClick={handleSubmitFeed}>
            올리기
          </Button>
          <Button size="sm" color="blue" onClick={handleTestRef}>
            Ref 확인
          </Button>
        </div>
      </div>
    </div>
  );
}
export default React.memo(FeedInput);
