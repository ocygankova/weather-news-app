import { AppDispatch } from 'redux/store';
import {
  hideLoader,
  receiveNews,
  removeErrorMessage,
  showErrorMessage,
  showLoader
} from 'redux/reducers/newsSlice';
import { newsRequest } from 'utils/axios';
import { INews } from 'models';

export const getNews = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(removeErrorMessage());
    dispatch(showLoader());

    const res = await newsRequest.get<INews>('/search/v2/articlesearch.json', {
      params: {
        fq: 'weather climate'
      }
    });

    dispatch(receiveNews(res.data.response.docs));
  } catch (err) {
    console.log(err);
    dispatch(showErrorMessage());
  } finally {
    dispatch(hideLoader());
  }
};
