import { AddControlType } from '../interfaces';
import * as uuid from 'uuid';

export class ControlButton {
    id: string;
    elementId: string
    element: HTMLElement | null;
    key: string;
    handler: ((type: string, data: any) => void) | undefined;

    constructor(data: AddControlType) {
        this.id = uuid.v4();
        this.elementId = data.elementId;
        this.element = document.getElementById(data.elementId);
        this.key = data.buttonType;
        this.handler = data.handler;
        this.initiateControlButton()
    }
    private initiateControlButton = (): void => {
        this.element?.addEventListener('click', () => {
            // @ts-ignore
            this.handler(this.key);
        })
    }
}