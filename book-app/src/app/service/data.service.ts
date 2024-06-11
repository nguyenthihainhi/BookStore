import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Author} from '../models/author';
import { Publisher } from '../models/publisher';
@Injectable({
  providedIn: 'root'
})
export class DataService{
  url = 'https://localhost:5001/api/Authors';
  urlPub = 'https://localhost:5001/api/Publishers';
  constructor(private http: HttpClient) { }
  getAuthors(){
    return this.http.get<Author[]>(this.url);
  }
  addAuthor(author: Author){
    return this.http.post(this.url, author);
  }
  getAuthor(id: number){
    return this.http.get<Author>( this.url + `/${id}`);
  }
  editAuthor(author: Author){
    return this.http.put(this.url, author);
  }
  deleteAuthor(authorId: number) {
    return this.http.delete(`${this.url}/${authorId}`);
  }
  getPublishers(){
    return this.http.get<Publisher[]>(this.urlPub);
  }
  addPublisher(publisher: Publisher){
    return this.http.post(this.urlPub, publisher);
  }
  editPublisher(publisher: Publisher){
    return this.http.put(this.urlPub, publisher);
  }
  deletePublisher(pubId: number) {
    return this.http.delete(`${this.urlPub}/${pubId}`);
  }
}
