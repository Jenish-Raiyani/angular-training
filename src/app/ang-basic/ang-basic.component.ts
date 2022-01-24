import { Component, OnInit } from '@angular/core';
import { ManageNamesService } from '../manage-names.service';
import { student } from '../student.model';

@Component({
  selector: 'app-ang-basic',
  templateUrl: './ang-basic.component.html',
  styleUrls: ['./ang-basic.component.css']
})
 export class AngBasicComponent implements OnInit {
  title = 'Angular-trening';
  names=[''];
  show = true;
  userInput = '';
  ruserInput = '';

  message : string | undefined;
  students : any;
 constructor(private nameService:ManageNamesService){}
  ngOnInit(): void {
    //console.log("oninit called")
   // throw new Error('Method not implemented.');
 //   this.nameService.getNames().subscribe(data => this.students = data);

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

