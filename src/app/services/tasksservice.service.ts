import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksserviceService {

  private apiUrl="https://dummyjson.com/todos";

  arrayLocal:any

  constructor(private http:HttpClient) { }

getAlltasks(){
  return this.http.get(this.apiUrl);

 
}

deleteTasks(id:any){
  return this.http.delete(this.apiUrl +"/" + id)

}
getTaskById(taskId:any){

  this.arrayLocal = JSON.parse(localStorage.getItem('taskList') || '[]');
  console.log(this.arrayLocal)
  return this.arrayLocal.find((t: { id: any; }) => t.id === taskId);

}
updateTask(id: number, updatedTask: any) {
  const index = this.arrayLocal.findIndex((t: { id: number; }) => t.id === id);
  if (index !== -1) this.arrayLocal[index] = { id, ...updatedTask };
}


}
