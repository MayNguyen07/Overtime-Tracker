/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authProviderReducer from 'containers/HomePage/reducer';
import authProviderReducerAdmin from 'containers/AdminLogin/reducer'
import authProviderReducerOTAdmin from 'containers/OTRequestList/reducer'
import reducerAdminMembers from 'containers/AdminMembers/reducer'
import formProviderReducer from 'containers/RequestForm/reducer';


export type AppState = ReturnType<ReturnType<typeof createReducer>>;

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    auth: authProviderReducer,
    admin:authProviderReducerAdmin,
    form: formProviderReducer,
    otRequestAdmin: authProviderReducerOTAdmin,
    adminMember:reducerAdminMembers,
    ...injectedReducers,
  });

  return rootReducer;
}
