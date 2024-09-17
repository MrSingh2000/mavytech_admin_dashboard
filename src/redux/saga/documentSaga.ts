import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getDocumentsAction,
  createDocumentAction,
  deleteDocumentAction,
  setDocuments,
} from '../slices/documentSlice';
import { setLoading } from '../slices/loadingSlice';
import axiosInstance from '../../api-util/api';
import { createUrl } from '../../helper/functions';
import endpoints from '../../api-util/endpoints';

function* getDocuments(action: any): any {
  try {
    yield put(setLoading(true));

    const response = yield call(axiosInstance.get, endpoints.document.fetchAll);

    console.log('response: ', response.data.value);

    // Dispatch the action to update the document state with fetched data
    yield put(setDocuments(response.data.value));

    yield put(setLoading(false));
  } catch (error) {
    console.log('err: ', error);
    yield put(setLoading(false));
  }
}

function* saveDocument(action: any): any {
  try {
    yield put(setLoading(true));

    const response = yield call(
      axiosInstance.post,
      createUrl(endpoints.document.create),
      action.payload
    );

    console.log('respnse: ', response);

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* deleteDocument(action: any): any {
  try {
    yield put(setLoading(true));

    yield call(
      axiosInstance.delete,
      createUrl(`${endpoints.document.delete}/${action.payload}`),
      action.payload
    );

    yield put({ type: getDocumentsAction.type });

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* watchGetDocumentsSaga() {
  yield takeEvery(getDocumentsAction.type, getDocuments);
}

export function* watchCreateDocumentSaga() {
  yield takeEvery(createDocumentAction.type, saveDocument);
}

export function* watchDeleteDocumentSaga() {
  yield takeEvery(deleteDocumentAction.type, deleteDocument);
}
