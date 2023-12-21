import { createAction, props } from '@ngrx/store';

export const login = createAction('[User] Do Login');
export const loginSuccess = createAction('[User] Logged in Successfully');
export const logout = createAction('[User] Do Logout');
export const userActivity = createAction(
  '[User] User Activity',
  props<{ activityType: string }>()
);
