import { LearningPlaylist, LearningVideo } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  videos: {
    data: LearningVideo[];
    meta?: {
      total: number;
      page: string;
      limit: string;
      totalPages: number;
    };
  };
  playlists: {
    data: LearningPlaylist[];
    meta?: {
      total: number;
      page: string;
      limit: string;
      totalPages: number;
    };
  };
};

const initialState: State = {
  videos: {
    data: [],
  },
  playlists: {
    data: [],
  },
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    updateLearningData: (state, action: PayloadAction<Partial<State>>) => {
      return { ...state, ...action.payload };
    },

    getLearningDataAction: () => {},
    addLearningVideoAction: () => {},
    addLearningPlaylistAction: () => {},
    deleteLearningVideoAction: () => {},
    deleteLearningPlaylistAction: () => {},
    addVideoToPlaylistAction: () => {},
    removeVideoFromPlaylistAction: () => {},
    getLearningVideosAction: () => {},
    getLearningPlaylistsAction: () => {},
  },
});

export const {
  getLearningDataAction,
  updateLearningData,
  addLearningPlaylistAction,
  addLearningVideoAction,
  deleteLearningPlaylistAction,
  deleteLearningVideoAction,
  addVideoToPlaylistAction,
  removeVideoFromPlaylistAction,
  getLearningPlaylistsAction,
  getLearningVideosAction,
} = learningSlice.actions;

export default learningSlice.reducer;
