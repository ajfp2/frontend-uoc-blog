
import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/effects';

import * as authReducer from './auth/reducers';

export interface AppState {
    authApp: authReducer.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    authApp: authReducer.authReducer
}


export const EffectsArray: any[] = [
    AuthEffects
];