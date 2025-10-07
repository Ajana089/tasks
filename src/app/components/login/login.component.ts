import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  flag:boolean=false;
  logflag=true;
  errmsg=""
  usersList : { userName: string; password: string ,token: number}[] = [];
  
  loginForm:FormGroup=new FormGroup({
    userName:new FormControl("", [Validators.required]),
    password:new FormControl("", [Validators.required])

  })

  registerForm:FormGroup=new FormGroup({
    userName:new FormControl("", [Validators.required,this.existingUserValidator.bind(this)]),
    password:new FormControl("", [Validators.required])

  })

  existingUserValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();
    if (!value) return null;

    const storedUsers = JSON.parse(localStorage.getItem('usersList') || '[]');
    const exists = storedUsers.some((user: any) => user.userName.toLowerCase() === value.toLowerCase());

    return exists ? { userExists: true } : null;
  }

  

  constructor(private router:Router)
  {
  }

  actRegister(){
    this.flag=true;
    this.logflag=false;
 
  }
  inactiveRegister(){
    this.logflag=true;
    this.flag=false;
    
  }


  onLogin()
{
  
    const user = this.loginForm.value;
    let users = JSON.parse(localStorage.getItem('usersList') || '[]');

    const data=users.some(
      (user1: any) =>
        user1.userName.toLowerCase() === user.userName.toLowerCase() &&
        user1.password === user.password
    );
    if(data){
   // user.token = Math.floor(Math.random() * 1000);
    sessionStorage.setItem('loginuser', JSON.stringify(user));
    users.push(user);
    //localStorage.setItem('usersList', JSON.stringify(users));
    this.router.navigateByUrl("dashboard");
    this.loginForm.reset();
    }
    else{

      this.errmsg="Username or Password is not valid"

    }

}
onRegister(){
  const user = this.registerForm.value;
  
    
    user.token = Math.floor(Math.random() * 1000);
  
    
    sessionStorage.setItem('loginuser', JSON.stringify(user));
  
    
    let users = JSON.parse(localStorage.getItem('usersList') || '[]');
    users.push(user);
    localStorage.setItem('usersList', JSON.stringify(users));
    //this.router.navigateByUrl("dashboard");
    alert("Registered Successfully");
    this.flag=false;
    this.logflag=true;
    this.registerForm.reset();
}
}
