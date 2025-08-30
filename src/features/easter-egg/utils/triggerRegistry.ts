import type { ComponentType } from 'react';
import Beom from '../components/Beom';

export const COMPONENT_REGISTRY: Record<string, ComponentType<any>> = {
  teacher: Beom,
};

export const getComponentByCategory = (category: string) => {
  return COMPONENT_REGISTRY[category] || null;
};
