import PicSVG from '@/assets/icon/pic-16.svg?react';
// import VoteSVG from '@/assets/icon/vote-16.svg?react';
// import BalanceSVG from '@/assets/icon/balance-16.svg?react';
import DrawSVG from '@/assets/icon/draw-16.svg?react';
import React from 'react';

interface FeedOptionsProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
}

const feedOptions = [
  { id: 'image', icon: PicSVG, label: '사진' },
  { id: 'drawing', icon: DrawSVG, label: '그림그리기' },
];

function FeedOptions({ selected, onSelect }: FeedOptionsProps) {
  return (
    <ul className="flex gap-2">
      {feedOptions.map(({ id, icon: Icon, label }) => (
        <li key={id}>
          <label
            htmlFor={`feedOptions-${id}`}
            className={`flex-center flex-col md:flex-row gap-1 px-2 py-2 md:px-2 md:py-0.5 rounded-2xl cursor-pointer transition-colors duration-150 ease-in-out hover:bg-primary-light focus-visible:outline-1 focus-visible:outline-slate-900 ${selected === id ? 'bg-primary' : 'bg-secondary'}
                      `}
          >
            <input
              type="checkbox"
              name="feedOptions"
              id={`feedOptions-${id}`}
              checked={selected === id}
              onChange={() => onSelect(selected === id ? null : id)}
              aria-controls="feedsContent"
              aria-expanded={selected === id}
              className="sr-only"
            />
            <Icon aria-hidden />
            <span className="sr-only md:not-sr-only md:text-sm">{label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
export default React.memo(FeedOptions);
