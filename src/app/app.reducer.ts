
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './auth/reducers';


export interface AppState {
    authApp: reducers.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    authApp: reducers.authReducer
}