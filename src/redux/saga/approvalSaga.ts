import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getApprovalsAction,
  updateApprovalsAction,
} from '../slices/approvalSlice';
import { setLoading } from '../slices/loadingSlice';
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';
import { createUrl } from '../../helper/functions';

function* getApprovals(action: any): any {
  try {
    yield put(setLoading(true));

    const response = yield call(
      axiosInstance.get, endpoints.approval.fetchAll
    );

    console.log('resopnse: ', response.data.value);
    yield put(getApprovalsAction(response.data.value));

//yield put(updateApprovals(response.data.value));

    yield put(setLoading(false));
  } catch (error) {
    console.log('err; ', error);
    yield put(setLoading(false));
  }
}

function* updateApproval(action: any): any {
  try {
    yield put(setLoading(true));

      yield call(
      axiosInstance.put,
      createUrl(`${endpoints.approval.update}/${action.payload}`),
      action.payload
    );
    yield put({type: getApprovalsAction.type})

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* watchGetApprovalSaga() {
  yield takeEvery(getApprovalsAction.type, getApprovals);
}
export function* watchUpdateApprovalSaga() {
  yield takeEvery(updateApprovalsAction.type, updateApproval);
}