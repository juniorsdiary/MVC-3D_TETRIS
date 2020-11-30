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