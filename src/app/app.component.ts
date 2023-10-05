import { Component } from '@angular/core';
import { NewsApiService } from './Service/news-api.service';
import { News } from './models/News';
import { NumberFormatStyle } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  topHeadlinesData: News[] = [];
  _topHeadlinesData: News[]= [];
  pagination: number = 1;
  pageSize:number=200;
  indexSize:number=20;
  totalStories: number =500;
  title = 'Headlines';
  searchText = "";
  oldSearchText = " "; // one space so that for first time, this is not equal to searchText
  pageNumber:number=1;
  inProgress: boolean = false;
  constructor(private newsapi: NewsApiService) {
    console.log('app component constructor called');
  }

  loadNews() {
     this.inProgress = true;
     
     if(this.searchText !=""){
      this.indexSize =50;
     }
     for(let i=0;i<= this.indexSize; i++) {
        this.pagination = i*10;
        this.getNewsChunk();
     }
  }

  getNewsChunk(){
    this.newsapi.getNews(this.pageNumber, this.pagination, this.searchText)
    .subscribe({
      next: (response: News[]) => {
        this.topHeadlinesData =  this.topHeadlinesData.concat(response);
      },
      error: (error: any) => {
        console.log(error)
        this.inProgress =  false;
      },
      complete: () => { 
        this.inProgress =  false;
      }
    });
  }

  ngOnInit(): void {
    this.loadNews();
  }

  onSearch() {
    if(this.searchText !== this.oldSearchText){
      this.renderPage(1);
      this.oldSearchText = this.searchText;
    }
  }

  renderPage(event: number) {
    this.pageNumber = event;
    this.topHeadlinesData = [];
    this.loadNews();
  }
}
