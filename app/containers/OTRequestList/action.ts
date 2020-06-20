import ActionTypes from './constant';
import { action } from 'typesafe-actions';
import OTRequestList from './index';

export const DataLoad = () => action(ActionTypes.DATA_LOAD);

export const DataLoading = () => action(ActionTypes.DATA_LOADING);

export const DataLoaded = data => action(ActionTypes.DATA_LOADED, data);

export const AcceptRequest = (isAccepted: boolean, id: string) =>
  action(ActionTypes.ACCEPT_ACTION, { isAccepted, id });
export const DenyRequest = (reason: string, id: string) =>
  action(ActionTypes.DENY_ACTION, { reason, id });
