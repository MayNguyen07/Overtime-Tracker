import { takeLatest, put, call } from 'redux-saga/effects';
import ActionTypes from './constant';
import { authAdminLoginServices } from './services';
import * as actions from './action';
import { push } from 'connected-react-router';
import RouteNames from 'routes';

export function* watchAdminLoginSaga(dataPayload) {
  const { payload } = dataPayload;
  try {
    const response = yield call(authAdminLoginServices, payload);
    yield localStorage.setItem(
      'accessToken',
      response.data.result.access_token,
    );

    yield put(actions.AdminLoginSuccess(response.data.result.access_token));
    yield put(push(RouteNames.REQUEST_LIST));
  } catch (error) {
    yield put(actions.AdminLoginError(error.message));
  }
}
export default function* rootAuthSaga() {
  yield takeLatest(ActionTypes.LOGIN_REQUEST, watchAdminLoginSaga);
}
