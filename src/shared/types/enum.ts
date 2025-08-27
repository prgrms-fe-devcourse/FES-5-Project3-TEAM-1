export const Position = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom',
} as const;

export type Position = (typeof Position)[keyof typeof Position];
