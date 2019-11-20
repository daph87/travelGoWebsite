import { AppState } from "./appState";
import { AnyAction } from "redux";
import { ActionType } from "./actionType";

export function reducer(oldAppState: AppState | undefined, action: AnyAction): AppState {

    // ריק AppState החזר אובייקט Ever בקריאה הראשונה
    if (!oldAppState) {
        return new AppState();
    }

    // הישן לאחד חדש AppState-עבור כל קריאה אחרת - שכפל את ה
    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.GetAllVacations:
            newAppState.vacations = action.payload;
            break;

        case ActionType.GetAllFollows:
            newAppState.follows = action.payload;
            break;


        case ActionType.UpdateVacation:
            newAppState.vacation = action.payload;
            break;

        case ActionType.AddVacation:

            newAppState.vacations.push(action.payload);
            break;

        case ActionType.AddFollow:

            newAppState.follows.push(action.payload);
            break;

        case ActionType.AddUser:

            newAppState.users.push(action.payload);
            break;

        case ActionType.LoggedIn:
            newAppState.loggedUser = (action.payload);
            break;

        case ActionType.LoggedAdmin:
            newAppState.loggedAdmin = (action.payload);
            break;

        case ActionType.LoggedOut:
            newAppState.loggedUser = undefined;
            newAppState.loggedAdmin = undefined;
            break;

        case ActionType.ClearAllVacations:
            newAppState.vacations = [];
            break;


        case ActionType.DeleteFollows:
            for (let i = 0; i < newAppState.follows.length; i++) {
                if (newAppState.follows[i].vacationID === action.payload) {
                    newAppState.follows.splice(i, 1);
                    break;
                }
            }
            break;

        case ActionType.DeleteVacation:
            for (let i = 0; i < newAppState.vacations.length; i++) {
                if (newAppState.vacations[i].vacationID === action.payload) {
                    newAppState.vacations.splice(i, 1);
                    break;
                }
            }
            break;
    }

    return newAppState;
}



