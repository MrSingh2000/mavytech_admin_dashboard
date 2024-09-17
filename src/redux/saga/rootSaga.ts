import { fork, all } from 'redux-saga/effects';
import {
  watchGetEquipmentSaga,
  watchCreateEquipmentSaga,
  watchUpdateEquipmentSaga,
} from './equipmentSaga';
import { watchDeleteDocumentSaga, watchGetDocumentsSaga, watchCreateDocumentSaga } from './documentSaga';
import { watchCreateAdvertisementSaga, watchUpdateAdvertisementSaga,watchGetAdvertisementSaga } from './advertisementSaga';
import { watchGetApprovalSaga, watchUpdateApprovalSaga } from './approvalSaga';
export default function* rootSaga() {
  yield all([
    fork(watchGetEquipmentSaga),
    fork(watchCreateEquipmentSaga),
    fork(watchUpdateEquipmentSaga),
    fork(watchGetDocumentsSaga),
    fork(watchCreateDocumentSaga),
    fork(watchDeleteDocumentSaga),
    fork(watchGetAdvertisementSaga),
    fork(watchCreateAdvertisementSaga),
    fork(watchUpdateAdvertisementSaga),
    fork(watchGetApprovalSaga),
    fork(watchUpdateApprovalSaga)
  ]);
}
