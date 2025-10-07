import { Component } from '@angular/core';
import { FormsModule , FormControl, FormGroup,Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { TasksserviceService } from '../../services/tasksservice.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrl: './addtasks.component.css'
})
export class AddtasksComponent {
  maxId:any;
  tasks:any;
  newtaskarray:any;
   newtasksarraylocal:any;
   
  taskId: number | null = null;
  addtaskForm:FormGroup=new FormGroup({
    todo:new FormControl("", [Validators.required]),
    completed:new FormControl("", [Validators.required]),
    category:new FormControl(""),
    priority:new FormControl('medium'),
    description:new FormControl(""),
    assignedto:new FormControl(""),

  })

  taskForm:FormGroup;


  constructor(private taskservice:TasksserviceService,private router:Router,private activateroute:ActivatedRoute){
    this.taskForm = new FormGroup({
      todo: new FormControl('', Validators.required),
      completed: new FormControl(),
      category:new FormControl(''),
      priority:new FormControl(''),
      description:new FormControl(''),
       assignedto:new FormControl(''),
    });
  }
  ngOnInit() {
    this.getAlltasksks();
    this.taskId = Number(this.activateroute.snapshot.paramMap.get('id'));
    console.log(this.taskId)
    if (this.taskId) {
      console.log(this.taskId)
      const task = this.taskservice.getTaskById(this.taskId);
      if (task) {
        this.addtaskForm.patchValue(task);
      }
    }
  
  }

  getAlltasksks()

  {
   

      this.tasks=JSON.parse(localStorage.getItem('taskList') || '[]');;
      console.log(this.tasks);
    }
  

  addTasks(){

    let task=this.addtaskForm.value;
    this. newtasksarraylocal = JSON.parse(localStorage.getItem('newtask') || '[]');

//update

if (this.taskId) {
 
  //this.taskservice.updateTask(this.taskId, task);

  // Or update local arrays manually
  // const index = this.tasks.findIndex((t: { id: number | null; }) => t.id === this.taskId);
  // if (index !== -1) {
  //   this.tasks[index] = { id: this.taskId, ...task };
  //   localStorage.setItem('taskList', JSON.stringify(this.tasks));
  // }
  const index = this.tasks.findIndex((t: { id: number; }) => t.id ===this.taskId);
  if (index !== -1) this.tasks[index] = { id:this.taskId, ...task };
  console.log(this.tasks)

  localStorage.setItem('taskList', JSON.stringify(this.tasks));

  const newlocalstorage=this.newtasksarraylocal.findIndex((t: { id: number; }) => t.id ===this.taskId);
  if (newlocalstorage !== -1) this.newtasksarraylocal[newlocalstorage] = { id:this.taskId, ...task };
  console.log(this.tasks)

  localStorage.setItem('newtask', JSON.stringify(this.newtasksarraylocal));

 

  alert('Task updated successfully ✅');
} 

//ass tasks
else {


  //let newarrayid;
   this. newtasksarraylocal = JSON.parse(localStorage.getItem('newtask') || '[]');
  //  if(this.newtasksarraylocal){
  //    newarrayid=this.newtasksarraylocal.length > 0 ? Math.max(...this.newtasksarraylocal.map((t: any) => t.id)) :0;
  //  }
   if(this.tasks)
   { this.maxId = this.tasks.length > 0 ? Math.max(...this.tasks.map((t: any) => t.id)) :0;}
    
   // this.newtaskarray=[]
    task.id=this.maxId + 2;
   this.newtasksarraylocal.push(task);
   localStorage.setItem('newtask', JSON.stringify( this.newtasksarraylocal));
   alert("Registered Successfully");
}
   this.router.navigateByUrl("/dashboard/tasklist");
   this.addtaskForm.reset();

  }

}
