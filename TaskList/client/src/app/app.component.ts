import { Component } from '@angular/core';
import {TaskComponent} from './components/task/task.component';
import {TaskService} from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My-app';
  constructor(private _taskService:TaskService){
    
  }
}
