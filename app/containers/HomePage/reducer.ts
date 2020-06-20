/*
 *
 * LanguageProvider reducer
 *
 */
import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';
export const initialState: ContainerState = {
  init: '',
  loginError: '',
};

function authProviderReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOGIN_GOOGLE_REQUEST:
      return { ...state };

    case ActionTypes.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        loginError: '',
      };
    case ActionTypes.LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };
    default:
      return state;
  }
}
export default authProviderReducer;
