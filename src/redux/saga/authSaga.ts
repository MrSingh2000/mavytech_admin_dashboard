import {call, put, takeEvery} from 'redux-saga/effects';
import {
  setAuth,
  userLoginAction,
} from '../slices/authSlice';
import {withLoadingAndErrorHandling} from '../../utils/saga-utils';
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';
import {setLocalStorageItem} from '../../helper/functions';

function* login(action: any): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    const response = yield call(
      axiosInstance.post,
      endpoints.auth.login,
      action.payload,
    );

    yield call(
      setLocalStorageItem,
      'auth',
      JSON.stringify(response.data.value),
    );

    yield put(
      setAuth({
        authToken: response.data.value.token,
      }),
    );
  });
}


export function* watchUserLogin() {
  yield takeEvery(userLoginAction.type, login);
}
