import { ActionType } from 'typesafe-actions';
import * as actions from './action';

/* --- STATE --- */

interface MemberID {
  id: string;
  name: string;
}

interface OTRequest {
  id: string;
  creator_id: string;
  member_ids: MemberID[];
  from: string;
  to: string;
  approver_id: string;
  reason: string;
  status: 0;
  created_at: null;
  updated_at: null;
  hour: number;
  creator: MemberID;
  approver: MemberID;
}

interface OTRequestListData {
  current_page: number;
  data: OTRequest[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

interface OTRequestListProviderState {
  readonly init: string;
  readonly dataLoading: boolean;
  readonly data: OTRequestListData | [];
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = OTRequestListProviderState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
