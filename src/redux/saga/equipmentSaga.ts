import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createEquipmentAction,
  getEquipmentsAction,
  deleteEquipmentAction,
  updateEquipments,
} from '../slices/equipmentSlice';
import { setLoading } from '../slices/loadingSlice';
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';

function* getEquipments(action: any): any {
  try {
    yield put(setLoading(true));

    const { page = 1, limit = 3} = action.payload || {};

    const response = yield call(
      axiosInstance.get,
      `${endpoints.equipment.fetchAll}?page=${page}&limit=${limit}`
    );
    const equipmentData = response?.data?.value?.data || [];

    yield put(updateEquipments({
      equipment: equipmentData,
      totalRecords: response.data.value.totalRecords,
      currentPage: parseInt(response.data.value.currentPage),
      limit: parseInt(response.data.value.limit),
      totalPages: response.data.value.totalPages
    }));

    yield put(setLoading(false));
  } catch (error) {
    console.log('err; ', error);
    yield put(setLoading(false));
  }
}

function* saveEquipment(action: any): any {
  try {
    yield put(setLoading(true));

    yield call(
      axiosInstance.post,
      endpoints.equipment.create,
      action.payload
    );

    yield put({ type: getEquipmentsAction.type });

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
      `${endpoints.equipment.delete}/${action.payload}`,
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
