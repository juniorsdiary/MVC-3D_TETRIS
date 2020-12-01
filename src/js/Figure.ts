import AbstractFigure from './AbstractFigure';
import { IFigureInitialData } from './interfaces';

class Figure extends AbstractFigure {
  constructor(initialData: IFigureInitialData) {
    super(initialData);
  }

}

export default Figure;