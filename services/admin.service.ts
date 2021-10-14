import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item';
import { UserService } from './user.service';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  addCatgoryUrl:string = 'http://localhost:5000/api/addcatgory';
  addTypeUrl:string = 'http://localhost:5000/api/addtype';
  addSizeUrl:string = 'http://localhost:5000/api/addsize';
  getAllUsersUrl:string = 'http://localhost:5000/api/users';
  getUserUrl: string = 'http://localhost:5000/api/getUser';
  addAdminUrl: string = 'http://localhost:5000/api/addadmin';



  userID;
  user;

  constructor(private http:HttpClient, private userService: UserService) { }

  addCatgory(catgory: any){
    return this.http.post(this.addCatgoryUrl, catgory);
  }

  addType(type: any){
    return this.http.post(this.addTypeUrl, type);
  }

  addSize(size: any){
    return this.http.post(this.addSizeUrl, size);
  }

  getAllUsers(){
    return this.http.get(this.getAllUsersUrl);
  }

  setUserID(userID){
    this.userID = userID;
    console.log(this.userID)
  }

  getUser() {
    return this.http.post(this.getUserUrl, {userID: this.userID});
  }

  addAdmin(userID) {
    return this.http.post(this.addAdminUrl, {userID: userID});
  }

}
