import { useState } from 'react';
import ColorPalette from './ColorPalette';
import type { Lines, Tool } from '../types/drawing';
import Canvas from './Canvas';
import ToolBar from './ToolBar';

const colors = [
  { name: '빨강', value: '#EF4444' },
  { name: '주황', value: '#F97316' },
  { name: '노랑', value: '#EAB308' },
  { name: '초록', value: '#22C55E' },
  { name: '파랑', value: '#3B82F6' },
  { name: '남색', value: '#6366F1' },
  { name: '보라', value: '#A855F7' },
  { name: '검정', value: '#000000' },
  { name: '흰색', value: '#FFFFFF' },
];

function DrawingForm() {
  const [tool, setTool] = useState<Tool>('pen');
  const [lines, setLines] = useState<Lines[]>([]);
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [fill, setFill] = useState('#ffffff');

  /* 뒤로가기 기능 */
  const handleUndo = () => {
    setLines((prev) => prev.slice(0, prev.length - 1));
  };

  /* 새그림판(리셋) 기능 */
  const handleReset = () => {
    setLines([]);
    setFill('#ffffff');
    setTool('pen');
  };

  return (
    <div className="relative w-full">
      <p className="text-xl mb-5">그림 그리기</p>
      <div className="flex gap-3">
        <ColorPalette
          colors={colors}
          selectedColor={selectedColor}
          onSelectedColor={(color) => {
            setSelectedColor(color);
            setTool('pen');
          }}
        />

        <Canvas
          tool={tool}
          lines={lines}
          setLines={setLines}
          selectedColor={selectedColor}
          fill={fill}
          setFill={setFill}
        />
      </div>

      <ToolBar
        onSelectedTool={setTool}
        onReset={handleReset}
        onUndo={handleUndo}
      />
    </div>
  );
}
export default DrawingForm;
