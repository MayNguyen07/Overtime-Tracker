import ActionTypes from './constant';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  init: '',
  dataLoading: false,
  data: [],
};

function authProviderReducerOTAdmin(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.DATA_LOADING:
      return {
        ...state,
        dataLoading: true,
      };
    case ActionTypes.DATA_LOADED:
      console.log('helll0', action.payload);
      return {
        ...state,
        dataLoading: false,
        data: action.payload,
      };
    // case ActionTypes.DENY_ACTION:
    //   console.log("helllo Deny",action.payload)
    // return {
    //   ...state,
    //   dataLoading: false,
    // data: action.payload,
    // };

    default:
      return state;
  }
}
export default authProviderReducerOTAdmin;
