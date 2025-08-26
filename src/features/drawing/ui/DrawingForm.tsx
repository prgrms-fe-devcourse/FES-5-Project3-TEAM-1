import clsx from 'clsx';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import BackSVG from '@/assets/icon/back-24.svg?react';
import EraserSVG from '@/assets/icon/eraser-24.svg?react';
import FillSVG from '@/assets/icon/fill-24.svg?react';
import RefreshSVG from '@/assets/icon/refresh-24.svg?react';

type Tool = 'pen' | 'eraser' | 'fill';

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
  const [fill, setFill] = useState('#ffffff');
  const isDrawing = useRef(false);

  const drawContainerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);

  /* Stage는 width값 px로 밖에 안들어가 반응형을 위해 부모 width값 따라서 width값 받을 수 있도록... */
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
    if (tool === 'fill') {
      handleFill(selectedColor);
      return;
    }

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

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    setTool('pen');
  };

  const handleFill = (color: string) => {
    setFill(color);
    setTool('fill');
  };

  const handleReset = () => {
    setLines([]);
    setFill('#ffffff');
    setTool('pen');
  };

  const ChangeCursor = () => {
    switch (tool) {
      case 'pen':
        return `url(/src/assets/icon/pen-24.svg) 0 0, auto`;
      case 'fill':
        return `url(/src/assets/icon/fill-24.svg) 0 0, auto`;
      case 'eraser':
        return `url(/src/assets/icon/eraser-24.svg) 0 0, auto`;
      default:
        return 'default';
    }
  };

  return (
    <div ref={drawContainerRef} className="relative w-full">
      <p className="text-xl mb-5">그림 그리기</p>
      <div className="flex">
        <Stage
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          width={stageWidth}
          height={320}
          style={{ cursor: ChangeCursor() }}
          className="h-fit p-0 order-2 border-1 border-gray rounded-sm"
        >
          <Layer>
            <Rect x={0} y={0} width={stageWidth} height={320} fill={fill} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={5}
                tension={0.1}
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
                onClick={() => {
                  handleChangeColor(value);
                }}
                aria-label={name}
                className={clsx(
                  'w-6 h-6 rounded-full',
                  name === '흰색' ? 'border-1 border-black' : '',
                  selectedColor === value &&
                    tool === 'pen' &&
                    'ring-2 ring-black',
                )}
                style={{ backgroundColor: value }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          title="지우개"
          aria-label="지우개"
          onClick={() => {
            setTool('eraser');
          }}
        >
          <EraserSVG aria-hidden />
        </button>
        <button
          type="button"
          title="배경색 바꾸기"
          aria-label="배경 색 바꾸기"
          onClick={() => {
            setTool('fill');
          }}
        >
          <FillSVG aria-hidden />
        </button>
        <button
          type="button"
          title="새 그림판"
          aria-label="새 그림판"
          onClick={handleReset}
        >
          <RefreshSVG aria-hidden />
        </button>
      </div>
    </div>
  );
}
export default DrawingForm;
