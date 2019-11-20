
import { User } from "../models/user";
import { Vacation } from "../models/vacation";
import { Follow } from "../models/follow";

// מחלקה המכילה את כל המידע הקיים ברמת האפליקציה
export class AppState {
    public users: User[] = [];
    public vacations: Vacation[] = [];
    public vacation: Vacation | undefined;
    public loggedUser: User | undefined;
    public loggedAdmin: User | undefined;
    public follows: Follow[] = [];
    public follow: Follow | undefined;

}