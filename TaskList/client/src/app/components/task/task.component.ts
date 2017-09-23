import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../../task';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
 
  tasks:Task[];
  title:string;
  constructor(private _taskService: TaskService) {
        this._taskService.getTasks()
        .subscribe(tasks => {
          console.log(tasks);
          this.tasks = tasks;
        });
   }
   addTask(event){
     event.preventDefault();
     console.log(this.title);
     var newTask= {
       title:this.title,
       isDone:false
     }

     this._taskService.addTask(newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.title=''; //clearing form
        });
   }

   deleteTask(id){
     var tasks=this.tasks;
     this._taskService.deleteTask(id).subscribe(data => {
       
         for( var i =0;i<tasks.length;i++){
           if(tasks[i]._id == id){
             this.tasks.splice(i,1);
           }
         }
       
     });
   }

   updateStatus(task){
     var _task = {
       _id:task._id,
       title:task.title,
       isDone:!task.isDone
     };
     this._taskService.updateStatus(_task).subscribe(data => {
       task.isDone = !task.isDone;
     });
   }
  ngOnInit() {
  }

}
