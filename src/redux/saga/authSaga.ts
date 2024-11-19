import { call, put, takeEvery } from 'redux-saga/effects';
import { setUser, userLoginAction } from '../slices/authSlice';
import { withLoadingAndErrorHandling } from '../../utils/saga-utils';
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';
import { setLocalStorageItem } from '../../helper/functions';

function* login(action: any): any {
  console.log('here')
  yield* withLoadingAndErrorHandling(function* (): any {
    const response = yield call(
      axiosInstance.post,
      endpoints.auth.login,
      action.payload
    );

    yield call(
      setLocalStorageItem,
      'user',
      JSON.stringify(response.data.value)
    );

    yield put(
      setUser({
        authToken: response.data.value.token,
        userType: response.data.value.userType,
        details: response.data.value.details,
      })
    );
  });
}

export function* watchUserLogin() {
  yield takeEvery(userLoginAction.type, login);
}
