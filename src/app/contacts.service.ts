import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }
  url: string;
  contacts: any;
  skip:any;
  page:any;

  getEpmloyeeList(url){
    return this.http.get(url);
  }

  getEpmloyeeListPage(url){
    return this.http.get(url);
  }

  saveEmployeeDetails(url, newContact){

    var headers = new HttpHeaders();
    headers.append('Contact-Type', 'application/json');
    return this.http.post(url, newContact, {headers:headers});
  }

  deleteEmployee(url){
    return this.http.delete(url);
  }
}
