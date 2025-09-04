import { forwardRef } from 'react';
import emoji from '@/assets/emoji.gif';
import clsx from 'clsx';

interface PanelProps {
  className?: string;
}

const Panel01 = forwardRef<HTMLDivElement, PanelProps>(({ className }, ref) => {
  return (
    <div ref={ref} className={clsx('flex flex-col items-end', className)}>
      <img src={emoji} className="w-10 md:w-30 h-auto object-cover" />
      <h2 className="text-xl md:text-[56px] text-black">이모지로 표현하고</h2>
    </div>
  );
});

export default Panel01;
