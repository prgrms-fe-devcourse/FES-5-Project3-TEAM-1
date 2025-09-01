import { forwardRef } from 'react';

interface Panel04Props {
  className?: string;
}

const Panel04 = forwardRef<HTMLDivElement, Panel04Props>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`${className}`}>
        <h2 className="text-[3rem] text-black">저와 함께 떠나볼까요?</h2>
      </div>
    );
  },
);

export default Panel04;
