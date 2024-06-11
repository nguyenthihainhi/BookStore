import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { DataService } from '../service/data.service'
import { CityService } from '../service/city.service';
import { Publisher } from '../models/publisher';

@Component({
  selector: 'app-list-publisher',
  templateUrl: './list-publisher.component.html',
  styleUrl: './list-publisher.component.css'
})
export class ListPublisherComponent implements OnInit{
  publishers: Publisher[] = [];
  publisher: Publisher = new Publisher();
  cities: any[] = [];
  selectedCity: any;
  existPublisherId: number | null = null; 
   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataSevice: DataService,
    private cityService: CityService,
  ) {}
  ngOnInit(): void{
    this.loadPublisher();
    this.cities = this.cityService.getCities();
  }
  loadPublisher(): void{
    this.dataSevice.getPublishers().subscribe((publishers : Publisher[]) =>{
      this.publishers = publishers;
    });
  }
  addPublisher(){
    this.publisher.city = this.selectedCity;
    this.dataSevice.addPublisher(this.publisher).subscribe(() => {
      this.loadPublisher();
      this.clearForm();
    
    });
  }
  getPublisher(publisher: Publisher){
    this.publisher.pubId = publisher.pubId
    this.publisher.publisherName = publisher.publisherName;
    this.selectedCity = publisher.city;
    this.existPublisherId = publisher.pubId;
}
  onCityChange(event: any): void {
    this.selectedCity = event.target.value;
  }
  updatePublisher(){
    if (this.existPublisherId !== null) {
      this.publisher.city = this.selectedCity;
  
      this.dataSevice.editPublisher(this.publisher).subscribe(() => {
        this.loadPublisher();
        this.clearForm();
      });
    }
  }
  deletePublisher(pubId: number){
    this.dataSevice.deletePublisher(pubId).subscribe(() => {
      this.loadPublisher();
    });
  }
  clearForm() {
    this.publisher = new Publisher();
    this.selectedCity = '';
    this.existPublisherId = null;
  }
}
