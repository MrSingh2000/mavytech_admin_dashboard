import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createAdvertisementAction,
  getAdvertisementsAction,
  deleteAdvertisementAction,
  updateAdvertisementAction,
  setAdvertisements,
} from '../slices/advertisementSlice';
import { setLoading } from '../slices/loadingSlice';
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';

function* getAdvertisements(): any {
  try {
    yield put(setLoading(true));

    const response = yield call(
      axiosInstance.get,
      endpoints.advertisement.fetchAll
    );

    yield put(setAdvertisements(response.data.value));

    yield put(setLoading(false));
  } catch (error) {
    console.log('err; ', error);
    yield put(setLoading(false));
  }
}

function* saveAdvertisement(action: any): any {
  try {
    yield put(setLoading(true));

    const response = yield call(
      axiosInstance.post,
      endpoints.advertisement.create,
      action.payload
    );


    yield put({ type: getAdvertisementsAction.type });

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* updateAdvertisement(action: any): any {
  try {
    yield put(setLoading(true));

    yield call(
      axiosInstance.put,
      `${endpoints.advertisement.update}/${action.payload.id}`,
      action.payload.data
    );

    yield put({ type: getAdvertisementsAction.type });

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* deleteAdvertisement(action: any): any {
  try {
    yield put(setLoading(true));

    yield call(
      axiosInstance.delete,
      `${endpoints.advertisement.delete}/${action.payload}`,
      action.payload
    );

    yield put({ type: getAdvertisementsAction.type });

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* watchGetAdvertisementSaga() {
  yield takeEvery(getAdvertisementsAction.type, getAdvertisements);
}

export function* watchCreateAdvertisementSaga() {
  yield takeEvery(createAdvertisementAction.type, saveAdvertisement);
}

export function* watchDeleteAdvertisementSaga() {
  yield takeEvery(deleteAdvertisementAction.type, deleteAdvertisement);
}
export function* watchUpdateAdvertisementSaga() {
  yield takeEvery(updateAdvertisementAction.type, updateAdvertisement);
}
