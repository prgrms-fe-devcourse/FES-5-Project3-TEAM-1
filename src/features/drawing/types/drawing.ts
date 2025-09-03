export type Tool = 'pen' | 'eraser' | 'fill';

export interface Lines {
  tool: Tool;
  points: number[];
  color: string;
}

export interface CanvasRefHandle {
  changeToBlob: () => Promise<Blob>;
  isEmpty: () => boolean;
}

export interface DrawingRefProps {
  drawingRef: React.RefObject<CanvasRefHandle | null>;
  onDrawChange?: (hasDrawing: boolean) => void;
}
