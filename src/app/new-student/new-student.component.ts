import { Component, OnInit } from '@angular/core';
import { ManageNamesService } from '../manage-names.service';
import {  student } from '../student.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {
  name="";
  branch="";
  mode='create'
  std:student | undefined;
  stdId :any;
  isActive = true;
  isShow=false;
  constructor(private nameService: ManageNamesService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data =>{
      if(data.has('stdId')){
        this.mode='edit'
        this.stdId=data.get('stdId');
        this.nameService.getStudent(this.stdId).subscribe(data =>{
        this.std=data;
        })
      }
      else{
        this.mode='create'
      }
    })
  }

  onSave(studentForm : NgForm){
    if(studentForm.invalid){
      return
    }
    this.isShow=true;

    console.log(studentForm.value.name,studentForm.value.branch);
if(this.mode=='create'){
     //console.log(this.name,this.branch);
    this.nameService.addStudent(studentForm.value.name,studentForm.value.branch).subscribe((response) => {
      console.log("Api Success"+JSON.stringify(response))
  });
}
  else{

      this.nameService.updateStudent(this.stdId,studentForm.value.name,studentForm.value.branch).subscribe((response) => {
        console.log("Api Success"+JSON.stringify(response))
  });
}
  setTimeout(() => {
    this.isShow=false;
  }, 1000);
  studentForm.resetForm();
}

}
