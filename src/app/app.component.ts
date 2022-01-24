import { Component } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-trening';
  names=['jenish','raiyani','sem-5']
  show = true;
  userInput=' ';
  ruserInput=' '
  isAuthenticated:boolean=false;

  message : string | undefined;

  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.autoLogin()
  }
  checkAuth(){
    return this.authService.getAuthenticated()

  }
  doLogout(){
    this.authService.onLogout();
   // this.authService.setToken(null);
   // this.authService.setAuthenticated(false);
  }
  onClick(){



    if(this.userInput == ' ')
    {
      //this.message="Textbox is empty !!!";
      window.alert("Textbox is empty !!!");

    }
    else{
      this.names.push(this.userInput)
    }

  }
  remove(){

    let index = this.names.indexOf(this.ruserInput)
    if (index !== -1){
      this.names.splice(index,1)
    }
  }
}
