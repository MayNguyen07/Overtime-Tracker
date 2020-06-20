import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  formValue: '',
  loading: true,
  data: [],
};

const formProviderReducer = (
  state: ContainerState = initialState,
  action: ContainerActions,
) => {
  switch (action.type) {
    case ActionTypes.GET_USER_INFORMATION: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionTypes.GET_INFORMATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case ActionTypes.GET_VALUE_FORM:
      console.log('connect reducer', action);
      return { ...state };

    case ActionTypes.SUBMIT_SUCCESS:
      console.log('success');
      return {
        ...state,
      };
    case ActionTypes.SUBMIT_FAIL:
      console.log('failed');
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default formProviderReducer;
