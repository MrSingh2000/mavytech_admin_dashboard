import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getUsersAction,
  updateUserAction,
  setUsers
} from '../slices/usersSlice';
import { setLoading } from '../slices/loadingSlice';
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';

function* getUsers(): any {
  try {
    yield put(setLoading(true));

    const response = yield call(axiosInstance.get, endpoints.users.fetchAll);

    console.log('response: ', response.data.value);

    // Dispatch the action to update the User state with fetched data
    yield put(setUsers(response.data.value));

    yield put(setLoading(false));
  } catch (error) {
    console.log('err: ', error);
    yield put(setLoading(false));
  }
}

function* updateUser(action: any): any {
  try {
    yield put(setLoading(true));

    yield call(
      axiosInstance.patch,`${endpoints.users.update}/${action.payload.id}`,
      action.payload.data
    );

    yield put({type: getUsersAction.type})

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}


export function* watchGetUsersSaga() {
  yield takeEvery(getUsersAction.type, getUsers);
}

export function* watchUpdateUserSaga() {
  yield takeEvery(updateUserAction.type, updateUser);
}
