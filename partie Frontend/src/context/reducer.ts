import { Action, State } from '../types/index';
import {
  USER_LOGIN,
  USER_LOGIN_FAILS,
  USER_LOGOUT,
} from './actions/actionsTypes';

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case USER_LOGIN: {
      const { token, id, username, role } = payload;
      const user = { id, name: username, role };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { ...state, auth: { token, user } };
    }
    case USER_LOGIN_FAILS: {
      return { ...state, auth: { token: null, user: null, error: payload } };
    }
    case USER_LOGOUT: {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { ...state, auth: { token: null, user: null } };
    }

    default:
      return state;
  }
};
export default reducer;
