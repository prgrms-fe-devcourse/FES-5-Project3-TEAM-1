export type Tool = 'pen' | 'eraser' | 'fill';

export interface Lines {
  tool: Tool;
  points: number[];
  color: string;
}
