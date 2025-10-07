import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {

   data:string="";
   otp:number=0;
   errmsg="";
   userotp:number=0;
   flag:boolean=false;
    username:string="";
   errmsge=""
   errm="";
   
   users: { userName: string; password: string, token :number }[] = [];
   forgetForm:FormGroup=new FormGroup({
    userName:new FormControl("", [Validators.required]),
    
   })
   otpForm:FormGroup=new FormGroup({
    
    otpvalue:new FormControl(0, [Validators.required]),
   })

   passwordForm:FormGroup=new FormGroup({
    npassword:new FormControl("", [Validators.required]),
    cpassword:new FormControl("", [Validators.required]),
   })



   constructor(private router:Router){

   }

   ngOnInit(): void {
     this.users = JSON.parse(localStorage.getItem('usersList') || '[]');
    
   }


  forget()
 {

  if (this.forgetForm.valid) {
    const values = this.forgetForm.value;
  this.username=this.forgetForm.value.userName;
  const user = this.users.find(item => item.userName ===this.username);
 console.log(user)
 
 if(user)
  {
   this.otp=user['token'];
  
   this.errmsg=""
   console.log(this.otp);
}
else{

this.errmsg="Invalid Username";

}
  }
  else {
    console.log('Form is invalid!');
  }
   }

   forgetotp(){



    this.userotp=this.otpForm.value.otpvalue;

    

    if(this.userotp==this.otp)
    {

   
      this.flag=true;
      this.errm="";
    }

    else{
     this.errm="OTP is incorrect"
    }

   }

   update(){
   

    this.users = JSON.parse(localStorage.getItem('usersList') || '[]');


     const user = this.users.find(u => u.userName === this.username);

if (!user) {
  alert("User not found!");
  return;
}




    if(this.passwordForm.value.npassword===this.passwordForm.value.cpassword){

     // const user =this.users.find(u => u.userName === this.username);
     console.log(user)

      if(user) {
        user.password = this.passwordForm.value.npassword; 
       this.users.push(user);
        localStorage.setItem('usersList', JSON.stringify(this.users));
       
        this.errmsge = ''; 
        alert("password changed successfully");
        this.router.navigateByUrl('login');

        }
}

    else{
       this.errmsge="Passwords are not matching"
    }
   }
}
