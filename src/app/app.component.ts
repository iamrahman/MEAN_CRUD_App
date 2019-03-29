import { Component } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularApp';
  contacts: any;
  id:any;
  url:any;
  first_name:any;
  last_name:any;
  phone:any;
  data: any;
  page:number=0;
  skip:number=1;
  perPage:number=5;
  count: any;
  search_key:String;
  constructor(private api: ContactsService){}
  
  ngOnInit(){
    this.api.getEpmloyeeList('http://127.0.0.1:3000/api/contacts').subscribe(
      contacts => {
        this.contacts = contacts;
        console.log(contacts);
      }
    );

    this.api.getEpmloyeeListPage('http://127.0.0.1:3000/api/contact/count').subscribe(
      count => {
        this.count = count;
      }
    )
    
  }

  deleteEmployee(id){
    var conf = confirm("Do you want to delete Data ?");
    if(conf){
      var url = 'http://127.0.0.1:3000/api/contact/'+id;
      this.api.deleteEmployee(url).subscribe(data =>{
        data = this.data.splice(id, 1);
      });
      location.reload();
    }
  }

  saveContact(){
    const Contact ={
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    var url = 'http://127.0.0.1:3000/api/contact/';
    this.api.saveEmployeeDetails(url, Contact).subscribe(contact => {
      this.contacts.push(Contact);
    });
    this.api.getEpmloyeeListPage('http://127.0.0.1:3000/api/contact/count').subscribe(
      count => {
        this.count = count;
      }
    )
  }

  prevPage(){
    
    this.page = this.page - 1;
    this.skip = this.perPage*this.page;
    console.log(this.skip);
    this.api.getEpmloyeeListPage('http://127.0.0.1:3000/api/contacts/'+this.skip).subscribe(
      contacts => {
        this.contacts = contacts;
        this.page = this.page;
        console.log(contacts);
      }
    )
  }

  nextPage(){
    this.page = this.page + 1;
    this.skip = this.perPage*this.page;
    console.log(this.skip);
    this.api.getEpmloyeeListPage('http://127.0.0.1:3000/api/contacts/'+this.skip).subscribe(
      contacts => {
        this.contacts = contacts;
        this.page = this.page;
        console.log(contacts);
      }
    )
  }

  searchContact(){
    this.api.getEpmloyeeListPage('http://127.0.0.1:3000/api/contact/search/'+this.search_key).subscribe(
      contacts => {
        this.contacts = contacts;
        console.log(contacts);
      }
    )
  }

}
