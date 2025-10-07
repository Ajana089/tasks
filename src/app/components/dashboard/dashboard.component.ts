import { Component,OnInit  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  username:string="";

  loggeddata:any;

  constructor(private router:Router)
  {
  }

  ngOnInit(): void {
    
  const data=sessionStorage.getItem("loginuser");
  
  if(data){
    this.loggeddata = JSON.parse(data);
  }

  console.log(this.loggeddata.userName)
    
  }

  logout(){
    sessionStorage.removeItem("loginuser");
    this.loggeddata = null;
    this.router.navigateByUrl("login");
  }

}
