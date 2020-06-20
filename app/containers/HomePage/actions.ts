import ActionTypes from './constants';
import { action } from 'typesafe-actions';

export const loginRequest = data =>
  action(ActionTypes.LOGIN_GOOGLE_REQUEST, data);

export const loginSuccess = data =>
  action(ActionTypes.LOGIN_GOOGLE_SUCCESS, data);

export const loginError = error =>
  action(ActionTypes.LOGIN_GOOGLE_ERROR, error);
