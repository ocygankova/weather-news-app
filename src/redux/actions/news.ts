import { AppDispatch } from 'redux/store';
import {
  hideLoader,
  receiveNews,
  removeErrorMessage,
  setPage,
  setPagesQuantity,
  showErrorMessage,
  showLoader
} from 'redux/reducers/newsSlice';
import { newsRequest } from 'utils/axios';
import { INews } from 'models';

export const getNews =
  (page = 1) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(removeErrorMessage());
      dispatch(showLoader());

      const res = await newsRequest.get<INews>('/search/v2/articlesearch.json', {
        params: {
          page: `${page - 1}`
        }
      });

      dispatch(receiveNews(res.data.response.docs));
      dispatch(setPagesQuantity(res.data.response.meta.hits));
    } catch (err) {
      console.log(err);
      dispatch(showErrorMessage());
    } finally {
      dispatch(hideLoader());
    }
  };

export const updatePageNumber = (page: number) => (dispatch: AppDispatch) => {
  dispatch(setPage(page));
};
