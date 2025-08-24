import TextareaAutoSize from 'react-textarea-autosize';
import PicSVG from '@/assets/icon/pic-16.svg?react';
import VoteSVG from '@/assets/icon/vote-16.svg?react';
import BalanceSVG from '@/assets/icon/balance-16.svg?react';
import DrawSVG from '@/assets/icon/draw-16.svg?react';
import Button from '../Button';
import { useState } from 'react';

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
  const [selectedChkbox, setSelectedChkbox] = useState<string | null>(null);

  return (
    <div className="flex flex-col p-5 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.20)]">
      <div className="flex flex-col relative w-full">
        <TextareaAutoSize
          min-rows={1}
          name=""
          id=""
          maxLength={200}
          placeholder="익명으로 자유롭게 의견을 나눠보세요."
          className="pr-7 py-3 w-full min-h-12 resize-none overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-light"
        >
          {/* 여기에다가 사진 선택시 미리보기 하면 됨 */}
        </TextareaAutoSize>
        <span className="block absolute right-0 bottom-0 ml-auto text-gray-dark">
          200
        </span>
      </div>
      <div className="flex justify-between items-center mt-5">
        <ul className="flex gap-2">
          {feedOptions.map(({ id, icon: Icon, label, type }) => (
            <li key={id}>
              {type === 'file' ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    id={`feedOptions-${id}`}
                    className="hidden"
                  />
                  <label
                    htmlFor={`feedOptions-${id}`}
                    className="flex-center gap-1 px-2 py-0.5 bg-secondary rounded-2xl cursor-pointer transition-colors duration-150 ease-in-out hover:bg-primary-light"
                  >
                    <Icon aria-hidden />
                    <span className="text-sm">{label}</span>
                  </label>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    name="feedOptions"
                    id={`feedOptions-${id}`}
                    checked={selectedChkbox === id}
                    onChange={() =>
                      setSelectedChkbox(selectedChkbox === id ? null : id)
                    }
                    aria-controls="feedsContent"
                    className="hidden"
                  />
                  <label
                    htmlFor={`feedOptions-${id}`}
                    className={`flex-center gap-1 px-2 py-0.5 rounded-2xl cursor-pointer transition-colors duration-150 ease-in-out hover:bg-primary-light ${selectedChkbox === id ? 'bg-primary' : 'bg-secondary'}
                    `}
                  >
                    <Icon aria-hidden />
                    <span className="text-sm">{label}</span>
                  </label>
                </>
              )}
            </li>
          ))}
        </ul>

        <Button size="sm" color="blue">
          올리기
        </Button>
      </div>

      <div
        id="feedsContent"
        role="region"
        aria-live="polite"
        aria-atomic="true"
        aria-label="선택된 옵션"
        className="mt-3 pt-5 border-t-1 border-dashed border-gray-dark"
      >
        {selectedChkbox && feedOptionsContent[selectedChkbox]}
      </div>
    </div>
  );
}
export default FeedsInput;
