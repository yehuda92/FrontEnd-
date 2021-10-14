import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  items!: Array<any>;
  on = true;
  info = -1;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.items = this.itemService.myCart();
    if(this.items.length == 0)
       this.on = false;
  }

  sendItem(item) {
    this.itemService.setItemID(item.itemID);
    this.itemService.selectedItem(item);
  }

  removeItem(index){
    this.items.splice(index,1);
    if(this.items.length == 0)
    this.on = false;
  }

  printInfo(i){
    if(this.info === -1)
      this.info = i;
    else
      this.info = -1;
  }
}
