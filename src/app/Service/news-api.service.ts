import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'
import { News, NewsResponse } from '../models/News';
const API_BASE_URL: string ="https://localhost:7027/api";

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  constructor(private httpClient: HttpClient) { 
  }
  public getNews(pageNo:number =0,startPosition:number =0,totalRecords:number=200): Observable<NewsResponse> {
    return this.httpClient.get<NewsResponse>(`${API_BASE_URL}/News/GetStoriesItem?pageNo=${pageNo}&startPosition=${startPosition}&noOfRecords=${totalRecords}`)
    
  }
} 