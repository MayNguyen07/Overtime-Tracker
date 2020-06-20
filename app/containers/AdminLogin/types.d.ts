import { ActionType } from 'typesafe-actions';
import * as actions from './action';

/* --- STATE --- */

interface AuthProviderState {
  readonly init: string;
  readonly loginError: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = AuthProviderState;
type ContainerActions = AppActions;

export interface LoginRequest {
  email: string;
  password: string;
}

export { ContainerState, ContainerActions };
