import { IField, IFigure, IFigureInitialData, IPosition } from "./interfaces";

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

  abstract checkWayDown(): boolean
  abstract moveFigure(type: string): void
  abstract moveDown(): void
  abstract isWayAside(step: number): boolean
  abstract sideToSide(step: number): void
  abstract isWayAround(): boolean
  abstract transferToField(field: IField): void
  abstract isEndGame(): boolean
}

export default AbstractFigure;