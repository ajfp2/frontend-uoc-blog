import { createAction, props } from "@ngrx/store";
import { AuthDTO } from "../models/auth.dto";


export const loginAction = createAction('[Auth] Login Auth', props<{userForm: AuthDTO}>());

export const loginActionSuccess = createAction('[Auth] Login Success', props<{ user_id: string, access_token: string }>());

export const loginActionFailure = createAction('[Auth] Login Failure', props<{ payload: any }>());

export const logoutAction = createAction('[Auth] Logout');
