import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../authentication/auth.service';
import { ManageNamesService } from '../manage-names.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
 // students=[];

 students = [] as  any;
 panelOpenState = false;
 pageOptions=[1,2,5,10]
 pageLength=1;
 currPageSize= 2 ;
 currPageIndex=0

  constructor(private nameService:ManageNamesService, private authService:AuthService){}
  ngOnInit(): void {

    this.nameService.getStudents(this.currPageSize,this.currPageIndex+1).subscribe(data =>{
      console.log(data)
      this.students = data.students;
      this.pageLength=data.maxStudents;
      console.log(this.pageLength);

    });

  }
  onDelete(id: any){

    this.nameService.deleteStudent(id).subscribe(data =>{
       console.log(data)
         this.nameService.getStudents(this.currPageSize,this.currPageIndex+1).subscribe(data => {
          this.students = data.students;
          this.pageLength=data.maxStudents;
         });

      } );
  }
  onPageChange(pageEvn: PageEvent){
    console.log(pageEvn);
    this.currPageSize=pageEvn.pageSize;
    this.currPageIndex=pageEvn.pageIndex
    this.nameService.getStudents(this.currPageSize,this.currPageIndex+1).subscribe(data => {
      this.students = data.students;
      this.pageLength=data.maxStudents;
    });




  }
  checkAuth(){
    return this.authService.getAuthenticated();
  }

}
