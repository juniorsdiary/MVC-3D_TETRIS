import { FIGURES_NUMBER } from '../const/COMMON_CONST';

export const getRandomFigureIndex = () => {
  return Math.floor(Math.random() * FIGURES_NUMBER);
}