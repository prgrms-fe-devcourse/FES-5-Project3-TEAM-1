import { forwardRef } from 'react';
import emoji from '@/assets/emoji.gif';

interface PanelProps {
  className?: string;
}

const Panel01 = forwardRef<HTMLDivElement, PanelProps>(({ className }, ref) => {
  return (
    <div ref={ref} className={className}>
      {/* GIF 삽입 */}
      <img src={emoji} className="w-20 h-auto object-cover" />
      <h2 className="text-xl md:text-[3.5rem] text-black">이모지로 표현하고</h2>
    </div>
  );
});

export default Panel01;
