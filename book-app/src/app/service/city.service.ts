import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }
  private cities = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Los Angeles' },
    { id: 3, name: 'Chicago' },
    { id: 4, name: 'Houston' },
    { id: 5, name: 'Phoenix' },
    { id: 6, name: 'Philadelphia' },
    { id: 7, name: 'San Antonio' },
    { id: 8, name: 'San Diego' },
    { id: 9, name: 'Dallas' },
    { id: 10, name: 'San Jose' },
    { id: 11, name: 'Berkeley' }

  ];

  getCities() {
    return this.cities;
  }
}
