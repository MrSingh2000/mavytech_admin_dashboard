import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createAdvertisementAction,
  getAdvertisementsAction,
  deleteAdvertisementAction,
  updateAdvertisements,
} from '../slices/advertisementSlice';
import { setLoading } from '../slices/loadingSlice';
import axiosInstance from '../../api-util/api';
import { createUrl } from '../../helper/functions';
import endpoints from '../../api-util/endpoints';

function* getAdvertisements(action: any): any {
  try {
    yield put(setLoading(true));

    const response = yield call(
      axiosInstance.get,
      createUrl(endpoints.advertisement.fetchAll)
    );

    console.log('respnse: ', response.data.value);

    yield put(updateAdvertisements(response.data.value));

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
      createUrl(endpoints.advertisement.create),
      action.payload
    );

    console.log('respnse: ', response);

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
      createUrl(`${endpoints.advertisement.delete}/${action.payload}`),
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

export function* watchUpdateAdvertisementSaga() {
  yield takeEvery(deleteAdvertisementAction.type, deleteAdvertisement);
}
