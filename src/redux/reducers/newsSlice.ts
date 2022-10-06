import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from 'models';

interface NewsState {
  news: IArticle[];
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: NewsState = { news: [], isLoading: false, errorMessage: null };

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    showLoader(state) {
      state.isLoading = true;
    },
    hideLoader(state) {
      state.isLoading = false;
    },
    showErrorMessage(state) {
      state.errorMessage = 'Error while loading data...';
    },
    removeErrorMessage(state) {
      state.errorMessage = null;
    },
    receiveNews(state, action: PayloadAction<IArticle[]>) {
      state.news = action.payload;
    }
  }
});

export const { showLoader, hideLoader, showErrorMessage, removeErrorMessage, receiveNews } =
  newsSlice.actions;

export default newsSlice.reducer;
