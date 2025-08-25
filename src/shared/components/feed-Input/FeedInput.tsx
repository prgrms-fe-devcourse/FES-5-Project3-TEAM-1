import TextareaAutoSize from 'react-textarea-autosize';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import { useCloseOnOutsideOrEsc } from '@/shared/hook/useCloseOnOutsideOrEsc';
import Button from '../button/Button';
import FeedOptions from './FeedOptions';

const feedOptionsContent: Record<string, React.ReactNode> = {
  vote: <div>vote component 들어오면 됩니다.</div>,
  balance: <p>balance component 들어오면 됩니다.</p>,
  drawing: <p>drawing component 들어오면 됩니다.</p>,
};

function FeedInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [textareaText, setTextareaText] = useState('');
  const [selectedChkbox, setSelectedChkbox] = useState<string | null>(null);
  const feedsInputRef = useRef<HTMLDivElement>(null);
  const chkboxContentRef = useRef<HTMLDivElement>(null);
  const textLength = 200;

  /* textarea 글자 수 표시(감소 형태) */
  const handleCountText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaText(e.target.value.slice(0, textLength));
  };

  /* 옵션 선택 시 */
  const handleSelect = useCallback((id: string | null) => {
    setSelectedChkbox(id);
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

  return (
    <div
      ref={feedsInputRef}
      className="flex flex-col p-5 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.20)]"
    >
      <div className="flex flex-col relative w-full z-">
        <TextareaAutoSize
          min-rows={1}
          name="feedsInput"
          value={textareaText}
          maxLength={textLength}
          onChange={handleCountText}
          onFocus={() => setIsFocused(true)}
          placeholder="익명으로 자유롭게 의견을 나눠보세요."
          className="pr-7 py-3 w-full min-h-12 resize-none overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none"
        ></TextareaAutoSize>
        {/* <img src="" alt="" className="block w-full max-w-[12.5rem]" /> */}
        <span
          className={`block absolute right-0 bottom-0 ml-auto text-gray-dark transition-opacity duration-300 ease-in-out ${isFocused ? 'opacity-100' : 'opacity-0'}`}
        >
          {textLength - textareaText.length}
        </span>
      </div>
      <div
        className={`flex flex-wrap gap-2 md:gap-0 transition-all duration-300 ease-in-out ${isFocused || selectedChkbox ? 'overflow-visible max-h-96 pt-5' : 'overflow-hidden max-h-0'}`}
      >
        <FeedOptions selected={selectedChkbox} onSelect={handleSelect} />

        {selectedChkbox && (
          <div
            ref={chkboxContentRef}
            id="feedsContent"
            role="region"
            aria-live="polite"
            tabIndex={-1}
            aria-label="선택된 옵션"
            className="mt-3 pt-5 w-full border-t-1 border-dashed border-gray-dark order-3"
            style={{ maxHeight: selectedChkbox ? '500px' : '0px' }}
          >
            {feedOptionsContent[selectedChkbox]}
          </div>
        )}

        <div className="ml-auto">
          <Button size="sm" color="blue" className="">
            올리기
          </Button>
        </div>
      </div>
    </div>
  );
}
export default React.memo(FeedInput);
