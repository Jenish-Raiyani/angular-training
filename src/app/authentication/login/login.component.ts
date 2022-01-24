import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }
  isShow=false;
  isActive=true;
  ngOnInit(): void {
  }
  onLogin(form:NgForm){
  if(form.invalid){
    return
  }
  this.authService.onLogin(form.value.email, form.value.password).subscribe(result =>{
    console.log(result);
    this.authService.setToken(result.token)
    this.authService.setAuthenticated(true);
    const now=new Date();
    const expireAt = new Date(now.getTime()+result.expiresIn*1000);
    this.authService.saveAuthLocally(result.token,expireAt);
    console.log("Token will expires at :"+expireAt);
    this.authService.registerLogoutTimer(result.expiresIn)
    this.router.navigate(['/students'] )



  })
form.resetForm()
  }
}
