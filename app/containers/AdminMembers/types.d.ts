import { ActionType } from 'typesafe-actions';
import * as actions from './action';

/* --- STATE --- */

interface MemberID {
  id: string;
  name: string;
}

interface MembersList {
  id: string;
  name: string;
  email: string;
  role_id: string;
  active: number;
  created_at: null;
  updated_at: null;
  role: MemberID;
}

// interface AdminMembersList {
//   current_page: number;
//   data: MembersList[];
//   first_page_url: string;
//   from: number;
//   last_page: number;
//   last_page_url: string;
//   next_page_url: string;
//   path: string;
//   per_page: number;
//   prev_page_url: string;
//   to: number;
//   total: number;
// }

interface AdminMembersState {
  readonly init: string;
  readonly dataLoading: boolean;
  readonly data: MembersList[] | null;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = AdminMembersState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
