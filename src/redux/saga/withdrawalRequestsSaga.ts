import axiosInstance from '@/api-util/api';
import endpoints from '@/api-util/endpoints';
import { withLoadingAndErrorHandling } from '@/utils/saga-utils';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getWithdrawalRequestAction,
  setWithdrawalRequest,
  updateWithdrawalRequestAction,
} from '../slices/withdrawalRequestSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getWithdrawalRequests(): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    const response = yield call(
      axiosInstance.get,
      endpoints.withdrawalRequest.get
    );

    yield put(setWithdrawalRequest(response.data.value));
  });
}

function* updateWithdrawalRequest(
  action: PayloadAction<{
    transactionId: string;
    completed: boolean;
    userId: string;
  }>
): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    const response = yield call(
      axiosInstance.put,
      endpoints.withdrawalRequest.update,
      action.payload
    );

    yield put(setWithdrawalRequest(response.data.value));
  });
}

export function* watchGetWithdrawalRequestsSaga() {
  yield takeEvery(getWithdrawalRequestAction.type, getWithdrawalRequests);
}

export function* watchUpdateWithdrawalRequestsSaga() {
  yield takeEvery(updateWithdrawalRequestAction.type, updateWithdrawalRequest);
}
