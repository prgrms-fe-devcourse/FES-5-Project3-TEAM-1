import type { KonvaEventObject } from 'konva/lib/Node';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { Stage as TStage } from 'konva/lib/Stage';
import type { CanvasRefHandle, Lines, Tool } from '../types/drawing';

interface Props {
  tool: Tool;
  lines: Lines[];
  setLines: React.Dispatch<React.SetStateAction<Lines[]>>;
  selectedColor: string;
  fill: string;
  setFill: (color: string) => void;
}

const Canvas = forwardRef<CanvasRefHandle, Props>(
  ({ tool, lines, setLines, selectedColor, fill, setFill }, ref) => {
    const isDrawing = useRef(false);
    const drawContainerRef = useRef<HTMLDivElement>(null);
    const [stageWidth, setStageWidth] = useState(0);
    const stageRef = useRef<TStage | null>(null);

    // 그림 그린 걸 이미지로 변환해서 올리기(url)
    useImperativeHandle(ref, () => ({
      changeToBlob: async () => {
        if (!stageRef.current) throw new Error('Canvas 준비 안됨');
        const dataURL = stageRef.current.toDataURL();
        const blob = await (await fetch(dataURL)).blob();
        return blob;
      },
      isEmpty() {
        return lines.length === 0;
      },
    }));

    /* Stage는 width값 px 고정값만 넣을 수 있음 ->반응형대응(부모 width값 따라서 width값 변함) */
    useEffect(() => {
      const updateWidth = () => {
        if (drawContainerRef.current?.offsetWidth) {
          setStageWidth(drawContainerRef.current.offsetWidth - 2);
        }
      };

      updateWidth();

      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (tool === 'fill') {
        setFill(selectedColor);
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
      // 그리지 않을때
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      if (!point) return;

      // 각 지점 추가
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // 마지막 지점
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    /* tool 마다 커서포인트 변경 */
    const ChangeCursor = () => {
      switch (tool) {
        case 'pen':
          return `url(/src/assets/icon/pen-24.svg) 0 0, auto`;
        case 'fill':
          return `url(/src/assets/icon/fill-24.svg) 0 0, auto`;
        case 'eraser':
          return `url(/src/assets/icon/square-24.svg) 12 12, auto`;
        default:
          return 'default';
      }
    };

    return (
      <div ref={drawContainerRef} className="w-full">
        <Stage
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          width={stageWidth}
          height={320}
          style={{ cursor: ChangeCursor() }}
          className="h-fit p-0 border-1 border-gray"
        >
          <Layer>
            <Rect x={0} y={0} width={stageWidth} height={320} fill={fill} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.tool === 'eraser' ? 10 : 5}
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
      </div>
    );
  },
);
export default Canvas;
