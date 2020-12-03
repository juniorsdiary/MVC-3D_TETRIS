import AbstractFigure from './AbstractFigure';
import { IField, IFigureInitialData } from './interfaces';
import { FIGURE_ACTIONS } from './const/FIGURE_ACTIONS';

class Figure extends AbstractFigure {
  constructor(initialData: IFigureInitialData) {
    super(initialData);
  }

  checkWayDown = (): boolean => {
    return this.currentPosition.some(item => {
      const targetRow = this.field.element.children[item[1] + 1];
      if (targetRow !== undefined) {
        const targetCell = targetRow.children[item[0]];
        if (targetCell.firstElementChild !== null) {
          return targetCell.firstElementChild.classList.contains('staticCube');
        } else {
          return false;
        }
      } else {
        return true;
      }
    });
  }

  moveFigure = (type: string): any => {
    switch (type) {
      case FIGURE_ACTIONS.DOWN:
        return this.moveDown();
      case FIGURE_ACTIONS.ROTATE:
        return this.rotate();
    }
  }

  moveDown = (): void => {
    this.positions.forEach(position => position.forEach(cubeCoords => cubeCoords[1]++));
  }

  isWayAside = (step: number): boolean => {
    return this.currentPosition.every(item => {
      const targetRow = this.field.element.children[item[1]];
      const targetCell = targetRow.children[item[0] + step];
      if (targetCell !== undefined) {
        if (targetCell.firstElementChild !== null) {
          const targetCube = targetCell.firstElementChild;
          return !targetCube.classList.contains('staticCube');
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
  }

  sideToSide = (step: number): void => {
    this.positions.forEach(item => item.forEach(elem => (elem[0] += step)));
  }

  isWayAround = (): boolean => {
    let nextPosition = this.currentPositionIndex;
    nextPosition <= 2 ? nextPosition++ : (nextPosition = 0);

    return this.positions[nextPosition].every(item => {
      const row = this.field.element.children[item[1]];
      const cell = row.children[item[0]];

      if (cell !== undefined) {
        if (cell.firstElementChild !== null) {
          const cube = cell.firstElementChild;
          return !cube.classList.contains('staticCube');
        }
        return true;
      }

      return false;
    });
  }

  rotate = () => {
    if (this.isWayAround()) {
      this.currentPositionIndex <= 2 ? this.currentPositionIndex++ : (this.currentPositionIndex = 0);
      this.currentPosition = this.positions[this.currentPositionIndex];
    }
  }

  transferToField = (field: IField): void => {
    this.field = field;
  }

  isEndGame = (): boolean => {
    return this.currentPosition.some(position => this.field.element.children[position[1]].children[position[0]].firstElementChild);
  }
}

export default Figure;