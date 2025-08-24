import TextareaAutoSize from 'react-textarea-autosize';
import Button from '../Button';
import { useCallback, useEffect, useRef, useState } from 'react';
import FeedsOptions from './FeedsOptions';
import React from 'react';

const feedOptionsContent: Record<string, React.ReactNode> = {
  vote: <div>vote component 들어오면 됩니다.</div>,
  balance: <p>balance component 들어오면 됩니다.</p>,
  drawing: <p>draw component 들어오면 됩니다.</p>,
};

function FeedsInput() {
  console.log('FeedsInput render');

  const [isFocused, setIsFocused] = useState(false);
  const [selectedChkbox, setSelectedChkbox] = useState<string | null>(null);
  const [textareaText, setTextareaText] = useState('');
  const feedsInputRef = useRef<HTMLDivElement>(null);
  const radioContentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textLength = 200;

  const handleCountText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaText(e.target.value.slice(0, textLength));
  };

  const handleSelect = useCallback((id: string | null) => {
    setSelectedChkbox(id);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        feedsInputRef.current &&
        !feedsInputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedChkbox && radioContentRef.current) {
      radioContentRef.current.focus();
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
          ref={textareaRef}
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
        <FeedsOptions selected={selectedChkbox} onSelect={handleSelect} />

        {selectedChkbox && (
          <div
            ref={radioContentRef}
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
export default React.memo(FeedsInput);
