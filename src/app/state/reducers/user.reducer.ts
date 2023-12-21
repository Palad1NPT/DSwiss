import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

const USER_FEATURE_PROPERTY = 'user';

export interface IActivityStatus {
  date: number;
  type: string;
}

export interface IUserState {
  logged: boolean;
  activity: IActivityStatus;
}

export const userInitialState: IUserState = {
  logged: false,
  activity: {
    date: 0,
    type: '',
  },
};

export const userReducer = createReducer(
  userInitialState,
  on(
    UserActions.loginSuccess,
    (state): IUserState => ({
      ...state,
      logged: true,
      activity: {
        date: new Date().getTime(),
        type: 'login',
      },
    })
  ),
  on(
    UserActions.logout,
    (state): IUserState => ({
      ...state,
      logged: false,
      activity: {
        date: 0,
        type: '',
      },
    })
  ),
  on(
    UserActions.userActivity,
    (state, action): IUserState => ({
      ...state,
      activity: {
        date: new Date().getTime(),
        type: action.activityType,
      },
    })
  )
);

export const selectUser = createFeatureSelector<IUserState>(
  USER_FEATURE_PROPERTY
);

export const selectUserLoggedIn = createSelector(
  selectUser,
  (state: IUserState) => state.logged
);

export const selectUserActivity = createSelector(
  selectUser,
  (state: IUserState) => state.activity
);
