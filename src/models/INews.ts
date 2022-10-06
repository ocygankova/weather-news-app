import { IArticle } from 'models/IArticle';

interface IResponse {
  docs: IArticle[];
}

export interface INews {
  response: IResponse;
}
