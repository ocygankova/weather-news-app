import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from 'models';

interface NewsState {
  news: IArticle[];
  isLoading: boolean;
  errorMessage: string | null;
  page: number;
  pagesQuantity: number;
}

const initialState: NewsState = { news: [], isLoading: false, errorMessage: null, page: 1, pagesQuantity: 1 };

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
    },
    setPagesQuantity(state, action: PayloadAction<number>) {
      state.pagesQuantity = action.payload < 1000 ? Math.ceil(action.payload / 10) : 100;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    }
  }
});

export const { showLoader, hideLoader, showErrorMessage, removeErrorMessage, receiveNews, setPage, setPagesQuantity } =
  newsSlice.actions;

export default newsSlice.reducer;
