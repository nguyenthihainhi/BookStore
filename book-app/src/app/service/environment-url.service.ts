import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  private apiUrl: string = 'https://api.example.com';

  constructor() { }

  getApiUrl(): string {
    return this.apiUrl;
  }
}