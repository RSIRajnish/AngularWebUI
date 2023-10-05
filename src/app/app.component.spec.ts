import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewsApiService } from './Service/news-api.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    const newsApiServiceStub = () => ({
      getNews: (pageNumber:number, pagination:number, searchText:string) => ({
        subscribe: (f:any) => ({})
      })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule,NgxPaginationModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [{ provide: NewsApiService, useFactory: newsApiServiceStub }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`topHeadlinesData has default value`, () => {
    expect(component.topHeadlinesData).toEqual([]);
  });

  it(`_topHeadlinesData has default value`, () => {
    expect(component._topHeadlinesData).toEqual([]);
  });

  it(`pagination has default value`, () => {
    expect(component.pagination).toEqual(1);
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`Headlines`);
  });

  it(`pageNumber has default value`, () => {
    expect(component.pageNumber).toEqual(1);
  });

  describe('loadNews', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getNewsChunk').and.callThrough();
      component.loadNews();
      expect(component.getNewsChunk).toHaveBeenCalled();
    });
  });

  describe('getNewsChunk', () => {
    it('makes expected calls', () => {
      const newsApiServiceStub: NewsApiService = fixture.debugElement.injector.get(
        NewsApiService
      );
      spyOn(newsApiServiceStub, 'getNews').and.callThrough();
      component.getNewsChunk();
      expect(newsApiServiceStub.getNews).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'loadNews').and.callThrough();
      component.ngOnInit();
      expect(component.loadNews).toHaveBeenCalled();
    });
  });
});
