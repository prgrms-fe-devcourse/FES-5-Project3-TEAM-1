import clsx from 'clsx';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import BackSVG from '@/assets/icon/back-24.svg?react';
import EraserSVG from '@/assets/icon/eraser-24.svg?react';
import FillSVG from '@/assets/icon/fill-24.svg?react';
import RefreshSVG from '@/assets/icon/refresh-24.svg?react';

type Tool = 'pen' | 'eraser';

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

interface Lines {
  tool: Tool;
  points: number[];
  color: string;
}

function DrawingForm() {
  const [tool, setTool] = useState<Tool>('pen');
  const [lines, setLines] = useState<Lines[]>([]);
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const isDrawing = useRef(false);

  const drawContainerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);

  /* stage에게 width값 100%를 직접 줄수가 없어 부모 길이를 찾아줘서 넣어야함ㅠ px단위로 들어가야한다고함 휴 */
  useEffect(() => {
    const updateWidth = () => {
      if (drawContainerRef.current?.offsetWidth) {
        setStageWidth(drawContainerRef.current.offsetWidth - 44);
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setLines([
      ...lines,
      { tool, points: [pos.x, pos.y], color: selectedColor },
    ]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    if (!point) return;
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div ref={drawContainerRef} className="relative w-full">
      <div className="flex">
        <Stage
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          width={stageWidth}
          height={300}
          className="order-2"
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>

        <ul className="flex flex-wrap gap-2 md:gap-2 order-1">
          {colors.map(({ name, value }, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => console.log('color 클릭')}
                aria-label={name}
                className={clsx(
                  'w-6 h-6 rounded-full',
                  name === '흰색' ? 'border-1 border-black' : '',
                )}
                style={{ backgroundColor: value }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex justify-end gap-3">
        <li>
          <button type="button" aria-label="지우개">
            <EraserSVG aria-hidden />
          </button>
        </li>
      </ul>
    </div>
  );
}
export default DrawingForm;
