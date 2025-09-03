import BackSVG from '@/assets/icon/back-24.svg?react';
import EraserSVG from '@/assets/icon/eraser-24.svg?react';
import FillSVG from '@/assets/icon/fill-24.svg?react';
import RefreshSVG from '@/assets/icon/refresh-24.svg?react';
import type { Tool } from '../types/drawing';
import TooltipButton from '@/shared/components/button/TooltipButton';
import { useState } from 'react';

interface Props {
  onSelectedTool: (tool: Tool) => void;
  onReset: () => void;
  onUndo: () => void;
}

function ToolBar({ onSelectedTool, onReset, onUndo }: Props) {
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const handleClick = (btnName: string, action: () => void) => {
    setActiveBtn(btnName);
    action();
    setTimeout(() => setActiveBtn(null), 500);
  };

  const toolBtnCss = (btnName: string) =>
    `rounded-full p-1 transition-colors duration-150 ease-in hover:bg-primary-light ${
      activeBtn === btnName ? 'bg-primary-light' : ''
    }`;

  return (
    <div className="flex justify-end gap-2">
      <TooltipButton
        label="뒤로가기"
        tooltip="뒤로가기"
        onClick={() => handleClick('undo', onUndo)}
        className={toolBtnCss('undo')}
      >
        <BackSVG aria-hidden />
      </TooltipButton>
      <TooltipButton
        label="지우개"
        tooltip="지우개"
        onClick={() => handleClick('eraser', () => onSelectedTool('eraser'))}
        className={toolBtnCss('eraser')}
      >
        <EraserSVG aria-hidden />
      </TooltipButton>
      <TooltipButton
        label="배경 색 바꾸기"
        tooltip="배경 색 바꾸기"
        onClick={() => handleClick('fill', () => onSelectedTool('fill'))}
        className={toolBtnCss('fill')}
      >
        <FillSVG aria-hidden />
      </TooltipButton>
      <TooltipButton
        label="새 그림판"
        tooltip="새 그림판"
        onClick={() => handleClick('reset', onReset)}
        className={toolBtnCss('reset')}
      >
        <RefreshSVG aria-hidden />
      </TooltipButton>
    </div>
  );
}
export default ToolBar;
