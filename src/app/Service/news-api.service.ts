import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'
import { News } from '../models/News';
const API_BASE_URL: string ="https://localhost:7027/api";

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  constructor(private httpClient: HttpClient) { 
  }
  public getNews(pageNo:number =0,startPosition:number =0,searchText:string=''): Observable<News[]> {
    return this.httpClient.get<News[]>(`${API_BASE_URL}/News/GetStoriesItem?pageNo=${pageNo}&startPosition=${startPosition}&searchText=${searchText}`)
    
  }
} 