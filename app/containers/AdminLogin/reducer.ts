import ActionTypes from './constant';
import { ContainerState, ContainerActions } from './types';
import { action } from 'typesafe-actions';

export const initialState: ContainerState = {
  init: '',
  loginError: '',
};

function authProviderReducerAdmin(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginError: '',
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload,
      };

    default:
      return state;
  }
}
export default authProviderReducerAdmin;
