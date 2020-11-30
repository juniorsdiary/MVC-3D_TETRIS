import { AddControlType } from "../interfaces";
import * as uuid from 'uuid';

export class ControlButton {
    id: string;
    element: string
    key: string;
    handler: ((type: string, data: any) => void) | undefined;

    constructor(data: AddControlType) {
        this.id = uuid.v4();
        this.element = data.elementId;
        this.key = data.buttonType;
        this.handler = data.handler;
    }
}