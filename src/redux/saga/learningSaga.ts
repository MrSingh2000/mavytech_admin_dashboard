import axiosInstance from '@/api-util/api';
import endpoints from '@/api-util/endpoints';
import { withLoadingAndErrorHandling } from '@/utils/saga-utils';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addLearningPlaylistAction,
  addLearningVideoAction,
  addVideoToPlaylistAction,
  deleteLearningPlaylistAction,
  deleteLearningVideoAction,
  getLearningDataAction,
  getLearningPlaylistsAction,
  getLearningVideosAction,
  removeVideoFromPlaylistAction,
  updateLearningData,
} from '../slices/learningSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getLearningData(): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    const videos = yield call(axiosInstance.get, endpoints.learning.getVideos);
    const playlists = yield call(
      axiosInstance.get,
      endpoints.learning.getPlaylist
    );

    yield put(
      updateLearningData({
        playlists: { data: playlists.data.value, meta: playlists.data.meta },
        videos: { data: videos.data.value, meta: videos.data.meta },
      })
    );
  });
}

function* getLearningVideos(
  action?: PayloadAction<{
    page?: number;
    limit?: number;
  }>
): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    const videos = yield call(
      axiosInstance.get,
      `${endpoints.learning.getVideos}?page=${
        action?.payload.page || 1
      }&limit=${action?.payload.limit || 10}`
    );

    yield put(
      updateLearningData({
        videos: { data: videos.data.value, meta: videos.data.meta },
      })
    );
  });
}

function* getLearningPlaylists(
  action?: PayloadAction<{
    page?: number;
    limit?: number;
  }>
): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    const playlists = yield call(
      axiosInstance.get,
      `${endpoints.learning.getPlaylist}?page=${
        action?.payload.page || 1
      }&limit=${action?.payload.limit || 10}`
    );

    yield put(
      updateLearningData({
        playlists: { data: playlists.data.value, meta: playlists.data.meta },
      })
    );
  });
}

function* addVideo(action: any): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    yield call(
      axiosInstance.post,
      endpoints.learning.createVideo,
      action.payload
    );

    yield* getLearningVideos();
  });
}

function* addPlaylist(action: any): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    yield call(
      axiosInstance.post,
      endpoints.learning.createPlaylist,
      action.payload
    );

    yield* getLearningPlaylists();
  });
}

function* removeVideo(action: any): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    yield call(
      axiosInstance.delete,
      `${endpoints.learning.removeVideo}/${action.payload}`
    );

    yield* getLearningVideos();
  });
}

function* removePlaylist(action: any): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    yield call(
      axiosInstance.delete,
      `${endpoints.learning.removePlaylist}/${action.payload}`
    );

    yield* getLearningPlaylists();
  });
}

function* addVideoToPlaylist(action: any): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    yield call(
      axiosInstance.put,
      `${endpoints.learning.addVideoToPlaylist}/${action.payload.playlistId}/${action.payload.videoId}`
    );

    yield* getLearningPlaylists();
  });
}

function* removeVideoToPlaylist(action: any): any {
  yield* withLoadingAndErrorHandling(function* (): any {
    yield call(
      axiosInstance.put,
      `${endpoints.learning.removeVideoFromPlaylist}/${action.payload.playlistId}/${action.payload.videoId}`
    );

    yield* getLearningPlaylists();
  });
}

export function* watchGetLearningSaga() {
  yield takeEvery(getLearningDataAction.type, getLearningData);
}

export function* watchGetLearningVideosSaga() {
  yield takeEvery(getLearningVideosAction.type, getLearningVideos);
}

export function* watchGetLearningPlaylistSaga() {
  yield takeEvery(getLearningPlaylistsAction.type, getLearningPlaylists);
}

export function* watchAddVideoSaga() {
  yield takeEvery(addLearningVideoAction.type, addVideo);
}

export function* watchAddPlaylistSaga() {
  yield takeEvery(addLearningPlaylistAction.type, addPlaylist);
}

export function* watchRemoveVideoSaga() {
  yield takeEvery(deleteLearningVideoAction.type, removeVideo);
}

export function* watchRemovePlaylistSaga() {
  yield takeEvery(deleteLearningPlaylistAction.type, removePlaylist);
}

export function* watchAddVideoToPlaylistSaga() {
  yield takeEvery(addVideoToPlaylistAction.type, addVideoToPlaylist);
}

export function* watchRemoveVideoFromPlaylistSaga() {
  yield takeEvery(removeVideoFromPlaylistAction.type, removeVideoToPlaylist);
}
