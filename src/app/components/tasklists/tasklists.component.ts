import { Component ,OnInit, ViewChild} from '@angular/core';
import { TasksserviceService } from '../../services/tasksservice.service';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


export interface PeriodicElement {
 
}


@Component({
  selector: 'app-tasklists',
  templateUrl: './tasklists.component.html',
  styleUrl: './tasklists.component.css'
})
export class TasklistsComponent {

  
tasks:any;
displayedColumns:any;;
dataSource:any;
taskarray:any;
servicetask:any;
total:any;
pendingCount:any;
completed:any;
pending:any;
newcount:any;
newcomplete:any;
completedarray:any;
newcom:any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
newtasksarraylocal:any;
constructor(private taskservice:TasksserviceService,private router:Router)
{

}

ngOnInit() {

 this.newtasksarraylocal = JSON.parse(localStorage.getItem('newtask') || '[]');
  this.getAlltasks();
  this.dataSource =this.tasks;
 
}

getAlltasks() {
 this.taskservice.getAlltasks().subscribe((data:any) => {

    this.servicetask=data.todos;
    this.servicetask=this.servicetask.slice(0,1);
    this.tasks=[...this.servicetask,...this.newtasksarraylocal]
    this.total=this.tasks.length;
    this.pending = this.tasks.filter((t: { completed: boolean; }) => t.completed === false).length; 
    this.newcount=this.newtasksarraylocal.filter((t: { completed: boolean; }) => t.completed === false).length;
   // console.log(this.newcount)
    this.pendingCount=this.pending + this.newcount;
    this.completedarray=this.tasks.filter((t: { completed: boolean; }) => t.completed === true).length;
    this.newcom=this.newtasksarraylocal.filter((t: { completed: boolean; }) => t.completed === true).length;
   // console.log(this.newcom)
    this.completed=this.completedarray + this.newcom;
    this.dataSource =this.tasks;
    this.displayedColumns= ['todo','completed','Edit','Delete'];
    localStorage.setItem("taskList",JSON.stringify(this.dataSource));
   // console.log(this.tasks);
   
  });
}



applyStatusFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  const completedRows = this.tasks.filter((task:any)=> task.completed === filterValue || task.completed === true)
  this.dataSource =completedRows;

}


onDelete(task:any){

const confirmed = window.confirm("Are you sure you want to delete this task?");

  const index =this.servicetask.findIndex((t: { id: any; })=> t.id === task.id);
  
if (index !== -1) {
  this.servicetask.splice(index, 1);
  //alert("item deleted")
  localStorage.setItem("taskList",JSON.stringify(this.servicetask));
  this.getAlltasks();
}
const index1 =this.newtasksarraylocal.findIndex((t: { id: any; })=> t.id === task.id);
console.log(index1)
 if (index1 !== -1) {
  this.newtasksarraylocal.splice(index1, 1);
  //alert("item deleted")
  localStorage.setItem("newtask",JSON.stringify(this.newtasksarraylocal));
 this.getAlltasks();
}


alert("Task deleted successfully!");

}
onEdit(task:any){
console.log(task.id)
 
 
  this.router.navigate(['/dashboard/addtasks', task.id]);
}


}
