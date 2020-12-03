import Field from './Field_Tetris';

export enum ButtonTypes {
    SaveGame = 'saveGame',
    StartGame = 'startGame',
    LastSaveGame = 'lastSaveGame',
    ResetGame = 'resetGame',
    ChangeLang = 'changeLang'
}

export type AddControlType = {
    buttonType: ButtonTypes;
    elementId: string;
    handler?: (type: string, data: any) => void;
};

export interface IControlButton {

}

export interface IControlsCollection {
    [key: string]: IControlButton
}

export interface IButtonData {
    buttonType: ButtonTypes;
    elementId: string
}

export interface IModel {
    interval: number;
    timer: number;
    initiate: () => void;
    view: IView;
    handleUserEvent: (e: KeyboardEvent) => void;
    startGame: () => void;
    extractHighScore: () => void;
    checkSavePoint: () => void;
}

export interface IView {
    gameField: IField;
    nextField: IField;
    figureData: any[];
    nextFigure: any[];
    initiateViews: () => void;
    render: (data: IRenderPayload) => void;
    countLevelsToErase: () => number[];
}

export interface IControllerInitialData {
    buttonsData: IButtonData[];
    model: IModel;
}

export interface IField {
    selector: string;
    squareValue: number;
    element: HTMLElement | null | Element;
    cells: number;
    rows: number;
    createField: () => void;
}

export interface IFieldInitialData {
    selector: string;
    squareValue: number;
}

export interface IRenderPayload {
    key: string;
    data?:
      IRenderField
      | IRenderFigure
      | IRenderStartButton
      | IRenderDeleteLevels
      | IRenderMoveLevel
      | IRenderHighScore
      | IRenderScore
      | IRenderLevel
      | any;
}

export interface IRenderField {
    field: IField;
}

export interface IRenderFigure {
    figure: IFigure;
}

export interface IRenderStartButton {
    value: boolean;
}

export interface IRenderDeleteLevels {
    levelsToErase: number[];
}

export interface IRenderMoveLevel {
    levelToMove: number;
}

export interface IRenderHighScore {
    highScore: number;
}

export interface IRenderScore {
    currentScore: number;
}

export interface IRenderLevel {
    level: number;
}

export interface IFigure {
    name: string;
    positions: IPosition[];
    currentPositionIndex: number;
    currentPosition: IPosition;
    field: any;
    setInitialPosition: () => void
    checkWayDown: () => boolean;
    moveFigure: (type: string) => void;
    moveDown: () => void;
    isWayAside: (step: number) => boolean;
    isWayAround: () => boolean;
    sideToSide: (step: number) => void;
    transferToField: (field: IField) => void;
    isEndGame: () => boolean;
}

export interface IFigureInitialData {
    name: string;
    field: string;
    positions: IPosition[];
}

export interface ICoordinate {
    [index: number]: number;
}

export interface IPosition extends Array<ICoordinate> {}
