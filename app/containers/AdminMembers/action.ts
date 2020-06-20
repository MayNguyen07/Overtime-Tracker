import ActionTypes from './constant';
import { action } from 'typesafe-actions';

export const DataLoad = data => action(ActionTypes.DATA_LOAD, data);

export const DataLoading = data => action(ActionTypes.DATA_LOADING, data);

export const DataLoaded = data => action(ActionTypes.DATA_LOADED, data);

export const ToggleStatus = (id: string) =>
  action(ActionTypes.TOGGLE_STATUS, { id });
export const ToggleRole = (id: string) =>
  action(ActionTypes.TOGGLE_ROLE, { id });
