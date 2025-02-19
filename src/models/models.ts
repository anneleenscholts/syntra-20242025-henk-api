export interface IEventToCreate {
  title: string;
  description: string;
  start: Date;
  end: Date;
}

type UserID = number;

export interface IEvent {
  title: string;
  description: string;
  start: Date;
  end: Date;
  organizer: UserID;
}

export interface IUserToCreate {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  defaultLanguage?: string;
}

export interface IUserToUpdate {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultLanguage?: string;
}
