import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  
  item: any[]=[];
  items!: Array<any>;
  info = -1;
  on =  true;
  constructor(private itemService: ItemService) { 
   
  }

  ngOnInit(): void {
    this.getResulte();
  }

  getResulte(){
    this.itemService.cast.subscribe(items => this.items = items);
    this.itemService.getSearchResulte().subscribe(item => {
      this.items = item;
      if(this.items.length === 0)
           this.on = false;
      else
           this.on = true;
    })
  }

  sendItem(item) {
    this.itemService.selectedItem(item);
  }

}
