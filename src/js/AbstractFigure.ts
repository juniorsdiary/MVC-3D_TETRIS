import { IFigure, IFigureInitialData, IPosition } from './interfaces';

abstract class AbstractFigure implements IFigure {
  name: string;
  positions: IPosition[];
  currentPositionIndex: number;
  currentPosition: IPosition;
  field: any;
  protected constructor(initialData: IFigureInitialData) {
    this.name = initialData.name;
    this.positions = initialData.positions;
    this.currentPositionIndex = 0;
    this.currentPosition = [];
    this.field = initialData.field;
  }
  setInitialPosition = () => {
    this.currentPositionIndex = 0;
    this.currentPosition = this.positions[this.currentPositionIndex];
  }
}

export default AbstractFigure;