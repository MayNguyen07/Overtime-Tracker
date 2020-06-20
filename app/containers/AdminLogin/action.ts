import ActionTypes from './constant';
import { action } from 'typesafe-actions';
import { LoginRequest } from './types';

export const AdminPostFetch = (data: LoginRequest) =>
  action(ActionTypes.LOGIN_REQUEST, data);

export const AdminLoginSuccess = data =>
  action(ActionTypes.LOGIN_SUCCESS, data);

export const AdminLoginError = error =>
  action(ActionTypes.LOGIN_FAILURE, error);
