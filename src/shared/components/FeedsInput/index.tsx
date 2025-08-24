import TextareaAutoSize from 'react-textarea-autosize';
import PicSVG from '@/assets/icon/pic-16.svg?react';
import VoteSVG from '@/assets/icon/vote-16.svg?react';
import BalanceSVG from '@/assets/icon/balance-16.svg?react';
import DrawSVG from '@/assets/icon/draw-16.svg?react';
import Button from '../Button';
import { useEffect, useRef, useState } from 'react';

const feedOptions = [
  { id: 'pic', icon: PicSVG, label: '사진', type: 'file' },
  { id: 'vote', icon: VoteSVG, label: '투표', type: 'radio' },
  { id: 'balance', icon: BalanceSVG, label: '밸런스게임', type: 'radio' },
  { id: 'draw', icon: DrawSVG, label: '그림그리기', type: 'radio' },
];

const feedOptionsContent: Record<string, React.ReactNode> = {
  vote: <p>vote component 들어오면 됩니다.</p>,
  balance: <p>balance component 들어오면 됩니다.</p>,
  draw: <p>draw component 들어오면 됩니다.</p>,
};

function FeedsInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedChkbox, setSelectedChkbox] = useState<string | null>(null);
  const [textareaText, setTextareaText] = useState('');
  const feedsInputRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textLength = 200;

  const handleCountText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaText(e.target.value.slice(0, textLength));
  };
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

  return (
    <div
      ref={feedsInputRef}
      className="flex flex-col p-5 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.20)]"
    >
      <div className="flex flex-col relative w-full z-">
        <TextareaAutoSize
          min-rows={1}
          name=""
          id=""
          ref={textareaRef}
          value={textareaText}
          maxLength={textLength}
          onChange={handleCountText}
          onFocus={() => setIsFocused(true)}
          placeholder="익명으로 자유롭게 의견을 나눠보세요."
          className="pr-7 py-3 w-full min-h-12 resize-none overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none"
        >
          {/* 여기에다가 사진 선택시 미리보기 하면 됨 */}
        </TextareaAutoSize>
        {isFocused && (
          <span className="block absolute right-0 bottom-0 ml-auto text-gray-dark">
            {textLength - textareaText.length}
          </span>
        )}
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${isFocused || selectedChkbox ? 'overflow-visible max-h-96' : 'overflow-hidden max-h-0'}`}
      >
        <div className="flex justify-between items-center pt-5">
          <ul className="flex gap-2">
            {feedOptions.map(({ id, icon: Icon, label, type }) => (
              <li key={id}>
                {type === 'file' ? (
                  <label
                    htmlFor={`feedOptions-${id}`}
                    className="flex-center gap-1 px-2 py-0.5 bg-secondary rounded-2xl cursor-pointer transition-colors duration-150 ease-in-out active:bg-primary  hover:bg-primary-light focus-within:outline-1 focus-within:outline-slate-900"
                  >
                    {' '}
                    <input
                      type="file"
                      accept="image/*"
                      id={`feedOptions-${id}`}
                      className="sr-only"
                    />
                    <Icon aria-hidden />
                    <span className="text-sm">{label}</span>
                  </label>
                ) : (
                  <label
                    htmlFor={`feedOptions-${id}`}
                    className={`flex-center gap-1 px-2 py-0.5 rounded-2xl cursor-pointer transition-colors duration-150 ease-in-out hover:bg-primary-light focus-within:outline-1 focus-within:outline-slate-900 ${selectedChkbox === id ? 'bg-primary' : 'bg-secondary'}
                      `}
                  >
                    <input
                      type="checkbox"
                      name="feedOptions"
                      id={`feedOptions-${id}`}
                      checked={selectedChkbox === id}
                      onChange={() =>
                        setSelectedChkbox(selectedChkbox === id ? null : id)
                      }
                      aria-controls="feedsContent"
                      className="sr-only"
                    />
                    <Icon aria-hidden />
                    <span className="text-sm">{label}</span>
                  </label>
                )}
              </li>
            ))}
          </ul>

          <Button size="sm" color="blue">
            올리기
          </Button>
        </div>

        {selectedChkbox && (
          <div
            id="feedsContent"
            role="region"
            aria-live="polite"
            aria-atomic="true"
            aria-label="선택된 옵션"
            className="mt-3 pt-5 border-t-1 border-dashed border-gray-dark "
            style={{ maxHeight: selectedChkbox ? '1000px' : '0px' }}
          >
            {feedOptionsContent[selectedChkbox]}
          </div>
        )}
      </div>
    </div>
  );
}
export default FeedsInput;
