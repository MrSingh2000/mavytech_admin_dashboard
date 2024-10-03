import { fork, all } from 'redux-saga/effects';
import {
  watchGetEquipmentSaga,
  watchCreateEquipmentSaga,
  watchUpdateEquipmentSaga,
} from './equipmentSaga';
import { watchDeleteDocumentSaga, watchGetDocumentsSaga, watchCreateDocumentSaga } from './documentSaga';
import { watchCreateAdvertisementSaga, watchUpdateAdvertisementSaga,watchGetAdvertisementSaga, watchDeleteAdvertisementSaga } from './advertisementSaga';
import { watchGetApprovalSaga, watchUpdateApprovalSaga } from './approvalSaga';
import { watchAcceptFlaggedSaga, watchGetFlaggedSaga, watchRejectFlaggedSaga } from './flaggedSaga';
import { watchGetUsersSaga, watchUpdateUserSaga } from './usersSaga';
import { watchUserLogin } from './authSaga';

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
    fork(watchUpdateApprovalSaga),
    fork(watchAcceptFlaggedSaga),
    fork(watchRejectFlaggedSaga),
    fork(watchGetFlaggedSaga),
    fork(watchGetUsersSaga),
    fork(watchUpdateUserSaga),
    fork(watchUserLogin),
    fork(watchDeleteAdvertisementSaga),
  ]);
}
