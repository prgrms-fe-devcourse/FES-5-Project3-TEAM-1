import type { ComponentType } from 'react';
import Beom from '../components/Beom';
import ConfettiComponent from '../components/Confetti';
import MomoWithCar from '../components/MomoWithCar';
import FlyingTarotCard from '../components/FlyingTarotCard';

export const COMPONENT_REGISTRY: Record<string, ComponentType<any>> = {
  teacher: Beom,
  congrats: ConfettiComponent,
  car: MomoWithCar,
  tarot: FlyingTarotCard,
};

export const getComponentByCategory = (category: string) => {
  return COMPONENT_REGISTRY[category] || null;
};
