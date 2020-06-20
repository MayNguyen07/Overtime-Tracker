import ActionTypes from './constant';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  init: '',
  dataLoading: false,
  data: null,
};

function reducerAdminMembers(
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
      return {
        ...state,
        dataLoading: false,
        data: action.payload,
      };

    default:
      return state;
  }
}
export default reducerAdminMembers;
