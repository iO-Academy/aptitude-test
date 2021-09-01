export interface BaseUser {
    name: string,
    email: string,
    [key: string]: any
}

export interface User extends BaseUser {
    id: string,
    timeMinutes: string,
    timeSeconds: string,
    canRetake: number,
    dataTestId: string,
    dataCategory: string,
    showTimer: number
}
