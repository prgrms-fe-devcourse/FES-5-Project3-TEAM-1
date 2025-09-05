import type { ComponentType } from 'react';
import Beom from '../components/Beom';
import ConfettiComponent from '../components/Confetti';
import MomoWithCar from '../components/MomoWithCar';
import FlyingTarotCard from '../components/FlyingTarotCard';
import Mori from '../components/Mori';

export const COMPONENT_REGISTRY: Record<string, ComponentType<any>> = {
  teacher: Beom,
  congrats: ConfettiComponent,
  car: MomoWithCar,
  tarot: FlyingTarotCard,
  dog: Mori,
};

export const getComponentByCategory = (category: string) => {
  return COMPONENT_REGISTRY[category] || null;
};
