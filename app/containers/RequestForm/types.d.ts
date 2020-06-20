import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface FormProviderState {
  readonly formValue: string;
  readonly loading: boolean;
  readonly data: any;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = FormProviderState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };