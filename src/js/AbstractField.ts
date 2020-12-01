import { IField, IFieldInitialData } from './interfaces';

abstract class AbstractField implements IField {
  selector: string;
  squareValue: number;
  element: HTMLElement | null | Element;
  cells: number;
  rows: number;

  protected constructor(initialData: IFieldInitialData) {
    this.selector = initialData.selector;
    this.squareValue = initialData.squareValue;
    this.element = document.getElementById(initialData.selector);
    this.cells = this._computeCells();
    this.rows = this._computeRows();
  }

  private _computeCells = (): number => {
    return parseInt(getComputedStyle(this.element as Element).width, 10) / this.squareValue;
  }

  private _computeRows = (): number => {
    return parseInt(getComputedStyle(this.element as Element).height, 10) / this.squareValue;
  }

  abstract createField(): void;
}

export default AbstractField;