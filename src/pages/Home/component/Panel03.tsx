import { forwardRef } from 'react';
import draw from '@/assets/draw.gif';

interface Panel03Props {
  className?: string;
}

const Panel03 = forwardRef<HTMLDivElement, Panel03Props>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`${className}`}>
        <img src={draw} alt="" />
        <h2 className="text-xl md:text-[3.5rem] text-black">그림도 그리고</h2>
      </div>
    );
  },
);

export default Panel03;
