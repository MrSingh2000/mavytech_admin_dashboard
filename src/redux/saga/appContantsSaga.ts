import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getAppContantsAction,
  setAppCostants,
  updateAppConstantsAction,
} from '../slices/appConstantsSlice';
import { withLoadingAndErrorHandling } from '@/utils/saga-utils';
import axiosInstance from '@/api-util/api';
import endpoints from '@/api-util/endpoints';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppConstantsType } from '@/types';

function* getAppConstants(): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    console.log(endpoints.appConstants.get);
    const response = yield call(axiosInstance.get, endpoints.appConstants.get);

    yield put(setAppCostants(response.data.value));
  });
}

function* updateAppConstants(action: PayloadAction<AppConstantsType>): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    const response = yield call(
      axiosInstance.post,
      endpoints.appConstants.update,
      action.payload
    );

    yield put(setAppCostants(response.data.value));
  });
}

export function* watchGetAppConstantsSaga() {
  yield takeEvery(getAppContantsAction.type, getAppConstants);
}

export function* watchUpdateAppConstantsSaga() {
  yield takeEvery(updateAppConstantsAction.type, updateAppConstants);
}
