import { takeLatest, put, call } from 'redux-saga/effects';
import ActionTypes from './constants';
import { authLoginServices } from './services';
import * as actions from './actions';
import { push } from 'connected-react-router';
import RouteNames from './../../routes/index';

export function* watchLoginSaga(dataPayload) {
  const {
    payload: { accessToken },
  } = dataPayload;

  try {
    const response = yield call(authLoginServices, accessToken);
    yield localStorage.setItem(
      'accessToken',
      response.data.result.access_token,
    );
    yield put(actions.loginSuccess(response.data.result.access_token));
    yield put(push(RouteNames.REQUEST_FORM));
  } catch (error) {
    yield put(actions.loginError(error.message));
  }
}
export default function* rootAuthSaga() {
  yield takeLatest(ActionTypes.LOGIN_GOOGLE_REQUEST, watchLoginSaga);
}
