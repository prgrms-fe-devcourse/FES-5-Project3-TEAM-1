import BackSVG from '@/assets/icon/back-24.svg?react';
import EraserSVG from '@/assets/icon/eraser-24.svg?react';
import FillSVG from '@/assets/icon/fill-24.svg?react';
import RefreshSVG from '@/assets/icon/refresh-24.svg?react';
import type { Tool } from '../types/drawing';
import TooltipButton from '@/shared/components/button/TooltipButton';

interface Props {
  onSelectedTool: (tool: Tool) => void;
  onReset: () => void;
  onUndo: () => void;
}

function ToolBar({ onSelectedTool, onReset, onUndo }: Props) {
  return (
    <div className="flex justify-end gap-2">
      <TooltipButton label="뒤로가기" tooltip="뒤로가기" onClick={onUndo}>
        <BackSVG aria-hidden />
      </TooltipButton>
      <TooltipButton
        label="지우개"
        tooltip="지우개"
        onClick={() => {
          onSelectedTool('eraser');
        }}
      >
        <EraserSVG aria-hidden />
      </TooltipButton>
      <TooltipButton
        label="배경 색 바꾸기"
        tooltip="배경 색 바꾸기"
        onClick={() => {
          onSelectedTool('fill');
        }}
      >
        <FillSVG aria-hidden />
      </TooltipButton>
      <TooltipButton label="새 그림판" tooltip="새 그림판" onClick={onReset}>
        <RefreshSVG aria-hidden />
      </TooltipButton>
    </div>
  );
}
export default ToolBar;
