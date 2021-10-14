import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  signUpUrl:string = 'http://localhost:5000/api/signup';
  loginUrl:string = 'http://localhost:5000/api/login';
  updateUrl: string = 'http://localhost:5000/api/updateUser';
  deleteUrl: string = 'http://localhost:5000/api/deleteUser';
  getUserUrl: string = 'http://localhost:5000/api/getUser';
  emailUrl: string = 'https://formsubmit.co/yehudawork1@gmail.com';
  createMessageUrl: string = 'http://localhost:5000/api/createmessage';
  getUserMessagesUrl: string = 'http://localhost:5000/api/getUserMessages';
  markAsReadUrl: string = 'http://localhost:5000/api/markAsRead';
  deleteMessageUrl: string = 'http://localhost:5000/api/deleteMessage';
  userItemsUrl: string = "http://localhost:5000/api/userItems";
  sendEmailUrl: string = 'http://localhost:5000/api/sendEmail';

  cookieExists:boolean=this.cookieservice.check("userID");

  private user = new BehaviorSubject<any>(!this.cookieExists);
  cast = this.user.asObservable();
  
  
 constructor(private cookieservice: CookieService, private http: HttpClient) { }

  signUp(SignUpForm: any){
    return this.http.post(this.signUpUrl, SignUpForm);
  }

  login(loginForm: any) {
    return this.http.post(this.loginUrl, loginForm);
  }

  getUser() {
    return this.http.post(this.getUserUrl, {userID: this.cookieservice.get("userID")});
  }
  
  update(updateForm: { userID: string; firstName: any; lastName: any; phoneNumber: any; password: any; }) {
    return this.http.post(this.updateUrl, updateForm);
  }

  deleteUser(passweord: { password: string; userID: string; }) {
    return this.http.post(this.deleteUrl, passweord);
  }
  
  sendEmail(email: any)
  {
     return this.http.post(this.emailUrl, email);
  }

  createMessage(message: { firstName: any; lastName: any; email: any; destination: any; subject: any; message: any; })
  {
    return this.http.post(this.createMessageUrl, message);
  }

  getUserMessages(userID: string){
    return this.http.post(this.getUserMessagesUrl, {userID: userID});
  }

  markAsRead(info: { userID: string; messageID: any; }){
    return this.http.post(this.markAsReadUrl, info);
  }

  deleteMessage(info: { userID: string; messageID: any; }){
     return this.http.post(this.deleteMessageUrl, info);
  }

  userItems(user: string) {
    return this.http.post(this.userItemsUrl, {userID: user});
  }

 sendEmails(message: any){
  return this.http.post(this.sendEmailUrl, message);
 }


 userConnected(newUser: boolean){
  this.user.next(newUser);
 }

}

