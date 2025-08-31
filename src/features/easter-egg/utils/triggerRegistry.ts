import type { ComponentType } from 'react';
import Beom from '../components/Beom';
import ConfettiComponent from '../components/Confetti';

export const COMPONENT_REGISTRY: Record<string, ComponentType<any>> = {
  teacher: Beom,
  congrats: ConfettiComponent,
};

export const getComponentByCategory = (category: string) => {
  return COMPONENT_REGISTRY[category] || null;
};
