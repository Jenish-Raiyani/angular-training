import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { student } from './student.model';
import { Observable } from 'rxjs';
import { faculty } from './faculty';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})
export class ManageNamesService {
  BASE_PATH='http://localhost:3000/api/'
  // addStudent(name: string, branch: string) {
  //   throw new Error('Method not implemented.');
  // }
  //names=['jenish','raiyani','sem-5']

  constructor(private http: HttpClient) { }
  // getNames(): Observable<student[]>
  // {
  //   //return this.names
  //  return this.http.get<student[]>('http://localhost:3000/api/student')
  // }
  getStudents(currPageSize: number,currPageIndex: number)

  {
    //return this.names
    const url=this.BASE_PATH+'listStudents?pageSize='+ currPageSize+'&pageIndex='+currPageIndex
    console.log(url)
   return this.http.get<{message: string, students:student[],maxStudents:number}>(url)
  }
  // getfaculty(): Observable<faculty[]>
  // {
  //   //return this.names
  //  return this.http.get<faculty[]>('http://localhost:3000/api/faculty')
  //  }
  getStudent(id:any){
    return this.http.get<student>(this.BASE_PATH+id)

  }

    addStudent(name: string, branch: string){
      const studentObj : student={
        id:null,
        name:name,
        branch:branch
      }
      return this.http.post('http://localhost:3000/api/addStudent',studentObj);
    }
    deleteStudent(id: any){
      return this.http.delete('http://localhost:3000/api/'+id)

    }
    updateStudent(id: string,name: any,branch: any){
      const std ={
        id:id,
        name: name,
        branch: branch
      }
      return this.http.put(this.BASE_PATH+id,std);

    }


}
