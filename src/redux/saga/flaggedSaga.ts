import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  acceptFlaggedAction,
  getFlagsAction,
  rejectFlaggedAction,
  setNewsFlags,
  setSalesFlags,
  setServicesFlags,
  setUserFlags,
} from '../slices/flaggedSlice';
import { setLoading } from '../slices/loadingSlice';
import axiosInstance from '../../api-util/api';
import { createUrl } from '../../helper/functions';
import endpoints from '../../api-util/endpoints';
import { withLoadingAndErrorHandling } from '../../utils/saga-utils';
import { FlaggedModels, FlaggedType } from '../../types';

// eslint-disable-next-line
function* getAllFlags(): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    const response = yield call(axiosInstance.get, endpoints.flagged.fetchAll);
    const data: FlaggedType[] = response.data.value;
    yield put(
      setServicesFlags(
        data.filter((item) => item.postModel === FlaggedModels.SERVICES)
      )
    );
    yield put(
      setSalesFlags(
        data.filter((item) => item.postModel === FlaggedModels.SALES)
      )
    );
    yield put(
      setNewsFlags(data.filter((item) => item.postModel === FlaggedModels.NEWS))
    );
    yield put(
      setUserFlags(data.filter((item) => item.postModel === FlaggedModels.USER))
    );

    console.log('here')
  });
}

function* rejectFlagged(action: any): any {
  try {
    yield put(setLoading(true));

    yield call(
      axiosInstance.put,
      createUrl(`${endpoints.flagged.reject}/${action.payload}`),
      action.payload
    );

    yield put({ type: getFlagsAction.type });

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* acceptFlagged(action: any): any {
  try {
    yield put(setLoading(true));

    yield call(
      axiosInstance.delete,
      createUrl(`${endpoints.flagged.accept}/${action.payload}`),
      action.payload
    );

    yield put({ type: getFlagsAction.type });

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* watchGetFlaggedSaga() {
  yield takeLatest(getFlagsAction.type, getAllFlags);
}

export function* watchRejectFlaggedSaga() {
  yield takeEvery(rejectFlaggedAction.type, rejectFlagged);
}

export function* watchAcceptFlaggedSaga() {
  yield takeEvery(acceptFlaggedAction.type, acceptFlagged);
}
