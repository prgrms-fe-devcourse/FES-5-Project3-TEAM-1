import { forwardRef } from 'react';

interface Panel04Props {
  className?: string;
  onAnimationComplete?: () => void; // 필요하면 Section03로 연결 콜백
}

const Panel04 = forwardRef<HTMLDivElement, Panel04Props>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`${className} relative`}>
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-[3rem] text-black mb-10">
            저와 함께 떠나볼까요?
          </h2>
        </div>
      </div>
    );
  },
);

export default Panel04;
