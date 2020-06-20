import ActionTypes from './constants';
import { action } from 'typesafe-actions';

export const getUserInformation = token =>
  action(ActionTypes.GET_USER_INFORMATION, token);

export const getInformationSuccess = data =>
  action(ActionTypes.GET_INFORMATION_SUCCESS, data);

export const getInnformationFail = error =>
  action(ActionTypes.GET_INFORMATION_FAIL, error);

export const getValueAction = (creator, member, approver, reason, token) => ({
  type: ActionTypes.GET_VALUE_FORM,
  payload: {
    creator,
    member,
    approver,
    reason,
  },
  token: token,
});

export const submitSuccess = data => action(ActionTypes.SUBMIT_SUCCESS, data);

export const submitFail = error => action(ActionTypes.SUBMIT_FAIL, error);
