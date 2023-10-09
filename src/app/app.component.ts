import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NewsApiService } from './Service/news-api.service';
import { News ,NewsResponse} from './models/News';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit{
  topHeadlinesData: NewsResponse = {newsModels:[], recordCount: 0};
  pagination: number = 1;
  pageNumber:number=1;
  inProgress: boolean = false;
  displayedColumns: string[] = ['title', 'url'];
  dataSource!: MatTableDataSource<News>;
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  totalRecords:number = 200;
  pagingSize:number = 10

  constructor(private newsapi: NewsApiService) {
    this.dataSource = new MatTableDataSource(this.topHeadlinesData.newsModels);
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  loadNews() {
     this.inProgress = true;
     for(let i=0;i<=20;i++) {
        this.pagination = i*10;
        this.getNewsChunk();
     }
  }

  getNewsChunk(){
    this.newsapi.getNews(this.pageNumber, this.pagination, this.totalRecords)
    .subscribe({
      next: (response: NewsResponse) => {
        let data = this.dataSource.data;
        data =  data.concat(response.newsModels);
        this.dataSource.data = data;
        this.totalRecords = response.recordCount;
        this.inProgress =  false;
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

  public onSearch = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
