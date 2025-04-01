import { createReducer, on } from "@ngrx/store";
import { AuthDTO } from "../models/auth.dto";
import { loginAction, loginActionFailure, loginActionSuccess, logoutAction } from "../actions";


export interface AuthState {
    credentials: AuthDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: AuthState = {
    //credentials: new AuthDTO('', '', '', ''),
    credentials: { user_id: '', access_token: '', email: '', password: ''},
    loading: false,
    loaded: true,
    error: null
};

const _authReducer = createReducer(
    initialState,
    on(loginAction, state => ({...state, loading: true })),
    on(loginActionSuccess, (state, { user_id, access_token }) => ({
        ...state,
        credentials: { ...state.credentials, user_id, access_token },
        loading: false,
        loaded: true,
        error: null,
      })),
      on(loginActionFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
          url: payload.url,
          status: payload.status,
          message: payload.message
        },
      })),
      on(logoutAction, state => ({
        ...state,
        credentials: { user_id: '', access_token: '', email: '', password: '' },
        loading: false,
        loaded: false,
        error: null,
      }))
);

export function authReducer(state: any, action: any){
    return _authReducer(state, action);
}