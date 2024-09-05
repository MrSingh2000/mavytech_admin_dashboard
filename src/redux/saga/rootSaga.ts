import { fork, all } from 'redux-saga/effects';
import {
  watchGetEquipmentSaga,
  watchCreateEquipmentSaga,
  watchUpdateEquipmentSaga,
} from './equipmentSaga';

export default function* rootSaga() {
  yield all([
    fork(watchGetEquipmentSaga),
    fork(watchCreateEquipmentSaga),
    fork(watchUpdateEquipmentSaga),
  ]);
}
