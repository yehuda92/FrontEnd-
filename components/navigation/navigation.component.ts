import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  

  loginIcon= true;
  addItem = "login";
  items;
  messages;
  title:string ="";  
  userName:string ="";
  @ViewChild('search') search: any;
  
  constructor(private cookieservice:CookieService, private userService: UserService, private itemService: ItemService) {
  
  }

 ngOnInit(): void {

 this.userService.cast.subscribe(u => this.loginIcon = u);

 }
 
 searchItems(){
    if(this.search.valid)
    {
      this.itemService.searchItems(this.search.value.search)
      .subscribe(
      (response) => { 
        this.items =  response
        this.itemService.newSearch(this.items);
      },
      (error)    => console.log(error) ); 
      }
  }

}