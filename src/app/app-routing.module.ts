import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyComponent } from './faculty/faculty.component';
import { StudentComponent } from './student/student.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthGuard } from './authentication/auth.guard';
const routes: Routes = [
  {path: 'students',component:StudentComponent},
  {path: 'faculty', component:FacultyComponent},
  {path: 'create', component:NewStudentComponent,canActivate:[AuthGuard]},
  {path: 'edit/:stdId', component:NewStudentComponent,canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
