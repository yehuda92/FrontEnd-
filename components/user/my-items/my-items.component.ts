import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss']
})
export class MyItemsComponent implements OnInit {
  items;
  on = true;
  info = -1;

  constructor(private cookieservice: CookieService, private itemService: ItemService,private userService: UserService ) { }

  ngOnInit(): void {
    this.userService.userItems(this.cookieservice.get("userID")).subscribe(item => {
      this.items = item;
      if(this.items.length == 0)
        this.on = false;
    })
  }
  sendItem(item) {
    this.itemService.setItemID(item.itemID);
    this.itemService.selectedItem(item);
  }

  removeItem(index){

    this.itemService.deleteItemByID(this.items[index].itemID).subscribe(item => {
      this.userService.userItems(this.cookieservice.get("userID")).subscribe(item => {
        this.items = item;
        if(this.items.length == 0)
          this.on = false;
      })
    })
  }

  printInfo(i){
    if(this.info === -1)
      this.info = i;
    else
      this.info = -1;
  }

}
