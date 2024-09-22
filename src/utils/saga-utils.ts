import {CallEffect, put, PutEffect} from 'redux-saga/effects';
import {setLoading} from '../redux/slices/loadingSlice';

type SagaGenerator = () => Generator<CallEffect<any> | PutEffect<any>, void, unknown>;

export function* withLoadingAndErrorHandling(saga: SagaGenerator): any {
  try {
    // Start loading
    yield put(setLoading(true));

    // Execute the main saga logic
    yield* saga();

    yield put(setLoading(false));
  } catch (error) {
    console.error('Error in saga:', error);
    yield put(setLoading(false));
  }
}