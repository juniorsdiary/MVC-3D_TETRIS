import { IFieldInitialData } from './interfaces';
import AbstractField from './AbstractField';

class Field extends AbstractField {
  constructor(private initialData: IFieldInitialData) {
    super(initialData);
  }

  createField(): void {
    console.log(`Dom Element with id ${this.selector} has ${this.cells} cells and ${this.rows} rows`);
  }
}

export default Field;