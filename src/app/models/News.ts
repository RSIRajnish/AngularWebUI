export class News {
  title: string | null;
  url: string | null;

  constructor(title: string | null = null, url: string | null = null) {
    this.title = title;
    this.url = url;
  }
}

export interface NewsResponse{
  newsModels: News[];
  recordCount: number;
}
