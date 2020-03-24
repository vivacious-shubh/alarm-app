import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor(
    private http: HttpClient
  ) { }

  getAlarms() {
    return this.http.get('/assets/data/alarms.json');
  }
}
