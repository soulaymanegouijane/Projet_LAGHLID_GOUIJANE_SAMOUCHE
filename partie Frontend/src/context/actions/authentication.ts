import { Dispatch } from 'react';
import axios from 'axios';
import { USER_LOGIN, USER_LOGIN_FAILS, USER_LOGOUT } from './actionsTypes';
import { Action } from '../../types';

export const login = async (dispatch: Dispatch<Action>, user: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signin`,
      user,
    );
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: USER_LOGIN_FAILS,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const logout = (dispatch: Dispatch<Action>) => {
  dispatch({
    type: USER_LOGOUT,
    payload: null,
  });
};
