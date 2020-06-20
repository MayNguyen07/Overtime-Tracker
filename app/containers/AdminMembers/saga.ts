import { takeLatest, put, call,takeEvery } from 'redux-saga/effects';
import ActionTypes from './constant';

import * as actions from './action';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { loadListMember, toggleStatus, toggleRole } from './service';


// for the data Load
export function* watchDataLoadMember(dataPayload) {
  try {
    yield put(actions.DataLoading(null));
    const accessToken = localStorage.getItem('accessToken');
    const response = yield call(loadListMember, accessToken);
   
     yield put(actions.DataLoaded(response.data.result.users));
  } catch (error) {
    //yield put(actions.AdminDataError(error.message));
  }
}

export function* watchToggleStatus(dataPayload) {
  const payload= dataPayload.payload as {id: string}
  try {
  
    const accessToken = localStorage.getItem('accessToken');
    const response = yield call(toggleStatus, payload.id, accessToken as string);
    yield put(actions.DataLoad(null));
     
  } catch (error) {
    //yield put(actions.AdminDataError(error.message));
  }
}

export function* watchToggleRole(dataPayload) {
  const payload= dataPayload.payload as {id: string}
  try {
  
    const accessToken = localStorage.getItem('accessToken');
    const response = yield call(toggleRole, payload.id, accessToken as string);
    yield put(actions.DataLoad(null));
     
  } catch (error) {
    //yield put(actions.AdminDataError(error.message));
  }
}


export default function* rootAuthSaga() {
  yield takeLatest(ActionTypes.DATA_LOAD, watchDataLoadMember);
  yield takeEvery(ActionTypes.TOGGLE_STATUS,watchToggleStatus);
  yield takeEvery(ActionTypes.TOGGLE_ROLE,watchToggleRole)
 }

 