import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { DataService } from '../service/data.service';
import { CityService } from '../service/city.service';
import {Author} from '../models/author';
@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrl: './list-author.component.css'
})
export class ListAuthorComponent implements OnInit {
 authors: Author[] = [];
 author: Author = new Author();
 cities: any[] = [];
 selectedCity: any;
 editingAuthorId: number | null = null; 
 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private dataSevice: DataService,
  private cityService: CityService,
) {}
ngOnInit(): void{
  this.loadAuthor();
  this.cities = this.cityService.getCities();
}
loadAuthor(): void{
  this.dataSevice.getAuthors().subscribe((authors: Author[]) =>{
    this.authors = authors;
  });
}
addAuthor(){
  this.author.city = this.selectedCity;
  this.dataSevice.addAuthor(this.author).subscribe(() => {
    this.loadAuthor();
    this.clearForm();
  
  });
}
onCityChange(event: any): void {
  this.selectedCity = event.target.value;
}
getAuthor(author: Author){
    this.author.firstName = author.firstName;
    this.author.lastName = author.lastName;
    this.selectedCity = author.city;
    this.author.authorId = author.authorId;
    this.editingAuthorId = author.authorId;
}
updateAuthor(){
  if (this.editingAuthorId !== null) {
    this.author.city = this.selectedCity;

    this.dataSevice.editAuthor(this.author).subscribe(() => {
      this.loadAuthor();

      this.clearForm();
    });
  }
}
deleteAuthor(authorId: number){
  this.dataSevice.deleteAuthor(authorId).subscribe(() => {
    this.loadAuthor();
  });
}
clearForm() {
  this.author = new Author();
  this.selectedCity = '';
  this.editingAuthorId = null;
}
}
