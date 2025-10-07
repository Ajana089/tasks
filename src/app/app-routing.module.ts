import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddtasksComponent } from './components/addtasks/addtasks.component';
import { TasklistsComponent } from './components/tasklists/tasklists.component';
import {MatBadgeModule} from '@angular/material/badge';

const routes: Routes = [
{path:'',redirectTo:'login',pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'forgetpassword',component:ForgetpasswordComponent},
{
  path:'dashboard',component:DashboardComponent,children:[
    {path: '', redirectTo: 'tasklist', pathMatch: 'full'},
    {path:'addtasks',component:AddtasksComponent},
   {path:'tasklist',component:TasklistsComponent},
   {path:'logout',component:LogoutComponent},
   { path: 'addtasks/:id', component:AddtasksComponent }
   
  ]
},
{ path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
