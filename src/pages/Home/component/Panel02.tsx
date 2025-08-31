import { forwardRef } from 'react';
import chat from '@/assets/chat.gif';

interface Panel02Props {
  className?: string;
}

const Panel02 = forwardRef<HTMLDivElement, Panel02Props>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`${className}`}>
        <img src={chat} alt="" />
        <h2 className="text-[3rem] text-black">댓글도 나누고</h2>
      </div>
    );
  },
);

export default Panel02;
