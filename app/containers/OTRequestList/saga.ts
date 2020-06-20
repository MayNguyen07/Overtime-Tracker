import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import ActionTypes from './constant';

import * as actions from './action';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { loadList, acceptRequest, denyRequest } from './service';

// for the data Load
export function* watchDataLoad(dataPayload) {
  try {
    // yield put(actions.DataLoading(null));
    const accessToken = localStorage.getItem('accessToken');
    const response = yield call(loadList, accessToken);
    if (response.status === 200) {
      yield put(actions.DataLoaded(response.data.result.overtimes));
    }
  } catch (error) {
    //yield put(actions.AdminDataError(error.message));
  }
}

export function* watchAcceptRequest(dataPayload) {
  const payload = dataPayload.payload as { isAccepted: boolean; id: string };

  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = yield call(
      acceptRequest,
      payload.isAccepted,
      payload.id,
      accessToken as string,
    );

    yield put(actions.DataLoad());
  } catch (error) {
    //yield put(actions.AdminDataError(error.message));
  }
}
export function* watchDenyRequest(dataPayload) {
  const payload = dataPayload.payload as { id: string; reason: string };

  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = yield call(
      denyRequest,
      payload.id,
      accessToken as string,
      payload.reason,
    );
    console.log('res deny', response);
    yield put(actions.DataLoad());
  } catch (error) {
    //yield put(actions.AdminDataError(error.message));
  }
}

export default function* rootAuthSaga() {
  yield takeLatest(ActionTypes.DATA_LOAD, watchDataLoad);
  yield takeEvery(ActionTypes.ACCEPT_ACTION, watchAcceptRequest);
  yield takeEvery(ActionTypes.DENY_ACTION, watchDenyRequest);
}
