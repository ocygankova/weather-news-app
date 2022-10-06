interface IHeadline {
  print_headline: string;
  main: string;
}
interface IMultimedia {
  url: string;
}

export interface IArticle {
  abstract: string;
  lead_paragraph: string;
  section_name: string;
  web_url: string;
  headline: IHeadline;
  multimedia: IMultimedia[];
}
