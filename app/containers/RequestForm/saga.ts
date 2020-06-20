import { call, takeLatest, put } from 'redux-saga/effects';
import swal from 'sweetalert';

import history from 'utils/history';
import ActionTypes from './constants';
import { postSubmission, getUserInformation } from './service';
import {
  submitFail,
  submitSuccess,
  getInformationSuccess,
  getInnformationFail,
} from './actions';
import { STATUS_CODE } from 'commons/configureURL';

export function* fetchUserInforamtionSaga(datapayload) {
  try {
    const token = yield localStorage.getItem('accessToken');
    const response = yield call(getUserInformation, token);
    yield put(getInformationSuccess(response.data.result.names));
  } catch (error) {
    yield put(getInnformationFail(error));
  }
}

export function* fetchSubmissionSaga(dataPayload) {
  const { payload } = dataPayload;
  console.log('heloo', payload);

  try {
    const token = yield localStorage.getItem('accessToken');

    const response = yield call(
      postSubmission,
      payload.creator,
      payload.member,
      payload.approver,
      payload.reason,
      token,
    );
    console.log(response);

    const { status, data } = response;

    if (status == STATUS_CODE.SUCCESS) {
      console.log('success');

      yield put(submitSuccess(response));
      swal('Hello World');
      history.push('/');
    }
  } catch (error) {
    yield put(submitFail(error));
  }
}

export default function* rootSagaDashboard() {
  yield takeLatest(ActionTypes.GET_USER_INFORMATION, fetchUserInforamtionSaga);
  yield takeLatest(ActionTypes.GET_VALUE_FORM, fetchSubmissionSaga);
}
