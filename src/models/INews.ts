import { IArticle } from 'models/IArticle';

interface IMeta {
  hits: number;
}

interface IResponse {
  docs: IArticle[];
  meta: IMeta;
}

export interface INews {
  response: IResponse;
}
