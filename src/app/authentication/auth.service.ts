import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth } from './auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_PATH='http://localhost:3000/auth/'
  private token!: string;
  private isAuthenticated:boolean=false;
  private timeHandler:any;
  router: any;
  constructor(private http:HttpClient) { }
  getToken(){
   return this.token;

  }

  setToken(token: any){
    this.token=token;

  }
  getAuthenticated(){
    return this.isAuthenticated;
  }
  setAuthenticated(isAuthenticated:boolean){
    this.isAuthenticated=isAuthenticated;
  }
  doSignUp(email: any,password: any){
    const signUpObj: auth={

      email:email,
      password:password
    }
    return this.http.post(this.BASE_PATH+"signup",signUpObj);
  }
  onLogin(email: any,password: any){
    const loginObj: auth={

      email:email,
      password:password
    }
    return this.http.post<{message:string,token:string,expiresIn: number}>(this.BASE_PATH+"login",loginObj);
  }
  saveAuthLocally(token:string,expireAt:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expireAt',expireAt.toString());
  }
  getAuthlocally(){
    return{
       token: localStorage.getItem('token'),
       expireAt: new Date(localStorage.getItem('expireAt')|| '{}')
    }
  }
  clearStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('expireAt');
  }
  onLogout(){
    console.log("logout");
    this.setToken(null);

    this.setAuthenticated(false);
    this.deregisterLogoutTimer();
    this.clearStorage();


  }
  registerLogoutTimer(expiresIn:number){
    this.timeHandler=setTimeout(()=>{
      this.onLogout();
    },expiresIn*1000)

  }
  deregisterLogoutTimer(){
    clearTimeout(this.timeHandler);
  }
  autoLogin() {
    const token = this.getAuthlocally().token;
    const expireAt = this.getAuthlocally().expireAt;

    if(token && expireAt) {
      console.log("Doing auto login...");
      const now = new Date();
      const expiryTime = expireAt.getTime() - now.getTime();
      console.log()
      if(expiryTime > 0) {
        this.setAuthenticated(true);
        this.setToken(token);
        this.deregisterLogoutTimer();
        this.registerLogoutTimer(expiryTime/1000);
      }
    }
  }


}
