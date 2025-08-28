import BackSVG from '@/assets/icon/back-24.svg?react';
import EraserSVG from '@/assets/icon/eraser-24.svg?react';
import FillSVG from '@/assets/icon/fill-24.svg?react';
import RefreshSVG from '@/assets/icon/refresh-24.svg?react';
import type { Tool } from '../types/drawing';

interface Props {
  onSelectedTool: (tool: Tool) => void;
  onReset: () => void;
  onUndo: () => void;
}

function ToolBar({ onSelectedTool, onReset, onUndo }: Props) {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        title="뒤로가기"
        aria-label="뒤로가기"
        onClick={onUndo}
      >
        <BackSVG aria-hidden />
      </button>
      <button
        type="button"
        title="지우개"
        aria-label="지우개"
        onClick={() => {
          onSelectedTool('eraser');
        }}
      >
        <EraserSVG aria-hidden />
      </button>
      <button
        type="button"
        title="배경색 바꾸기"
        aria-label="배경 색 바꾸기"
        onClick={() => {
          onSelectedTool('fill');
        }}
      >
        <FillSVG aria-hidden />
      </button>
      <button
        type="button"
        title="새 그림판"
        aria-label="새 그림판"
        onClick={onReset}
      >
        <RefreshSVG aria-hidden />
      </button>
    </div>
  );
}
export default ToolBar;
