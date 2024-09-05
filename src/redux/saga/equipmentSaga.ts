import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createEquipmentAction,
  getEquipmentsAction,
  deleteEquipmentAction,
  updateEquipments,
} from '../slices/equipmentSlice';
import { setLoading } from '../slices/loadingSlice';
import axiosInstance from '../../api-util/api';
import { createUrl } from '../../helper/functions';
import endpoints from '../../api-util/endpoints';

function* getEquipments(action: any): any {
  try {
    yield put(setLoading(true));

    const response = yield call(
      axiosInstance.get,
      createUrl(endpoints.equipment.fetchAll)
    );

    console.log('respnse: ', response.data.value);

    yield put(updateEquipments(response.data.value));

    yield put(setLoading(false));
  } catch (error) {
    console.log('err; ', error);
    yield put(setLoading(false));
  }
}

function* saveEquipment(action: any): any {
  try {
    yield put(setLoading(true));

    const response = yield call(
      axiosInstance.post,
      createUrl(endpoints.equipment.create),
      action.payload
    );

    console.log('respnse: ', response);

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* deleteEquipment(action: any): any {
  try {
    yield put(setLoading(true));

    yield call(
      axiosInstance.delete,
      createUrl(`${endpoints.equipment.delete}/${action.payload}`),
      action.payload
    );

    yield put({ type: getEquipmentsAction.type });

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* watchGetEquipmentSaga() {
  yield takeEvery(getEquipmentsAction.type, getEquipments);
}

export function* watchCreateEquipmentSaga() {
  yield takeEvery(createEquipmentAction.type, saveEquipment);
}

export function* watchUpdateEquipmentSaga() {
  yield takeEvery(deleteEquipmentAction.type, deleteEquipment);
}
