import type { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  Component: ComponentType;
  text: string;
  children?: RouteConfig[];
}
