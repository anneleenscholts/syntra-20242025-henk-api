export interface IEventToCreate {
    end: string,
    title: string,
    description: string,
    start: string
}

type UserID = number;

export interface IEvent {
    end: string,
    title: string,
    description: string,
    start: string,
    organizer: UserID
}

export interface IUserToCreate {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    defaultLanguage?: string
}