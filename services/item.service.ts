import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  imageData;
  item;
  myItems:  Array<any> = [];
  test!: Observable<any>;
  itemID;

  categoriesUrl: string = "http://localhost:5000/api/category";
  typesUrl: string = "http://localhost:5000/api/type";
  sizesUrl:  string = "http://localhost:5000/api/size";
  itemsUrl: string ="http://localhost:5000/api/items";
  addItemUrl: string = "http://localhost:5000/api/addItem";
  searchItemsUrl: string = "http://localhost:5000/api/searchItems";
  getItemByIDUrl: string = "http://localhost:5000/api//getItemByID";
  deleteItemByIDUrl: string = "http://localhost:5000/api//deleteItemByID";


  private items = new BehaviorSubject<any>({});
  cast = this.items.asObservable();
  
  constructor(private http:HttpClient) { }

  getItems(){
    return this.http.get(this.itemsUrl);
  }

  getCategories(){
    return this.http.get(this.categoriesUrl);
  }

  getTypes(){
    return this.http.get(this.typesUrl);
  }

  getSizes(){
    return this.http.get(this.sizesUrl);
  }

  addItem(item: Item){
    return this.http.post(this.addItemUrl,item);
  }

  getItem() {
     return this.item;
   }

  addToMyItems(item){
    for (let index = 0; index < this.myItems.length; index++) {
      if(item.itemID === this.myItems[index].itemID)
        return -1;
    }
    this.myItems.push(item);
    return 0;
   }

  myCart() {
    return this.myItems;
  }

  removeFromCart(itemID){
    for (let index = 0; index < this.myItems.length; index++) {
     if(this.myItems[index].itemID === itemID )
          this.myItems.splice(index,1);    
    }
  }

  selectedItem(item) {
    this.item = item;
  }

  searchItems(word) {
   return this.http.post(this.searchItemsUrl, {word: word});
  }

  getSearchResulte(){
      return this.items;
   }

   newSearch(items){
    this.items.next(items);
   }

   setItemID(itemID){
     this.itemID = itemID; 
   }

   getItemID(){
     return this.itemID;
   }

   getItemByID(itemID)
   {
      return this.http.post(this.getItemByIDUrl, {itemID: itemID});
   }

   deleteItemByID(itemID){
      return this.http.post(this.deleteItemByIDUrl, {itemID: itemID});
   }

 
}
