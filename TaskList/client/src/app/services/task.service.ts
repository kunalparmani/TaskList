import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private _http: Http) { 
    console.log('task service running');
  }
  getTasks(){
    return this._http.get('http://localhost:3000/api/tasks')
    .map(res => res.json());
  }
  addTask(newTask){
    var headers =new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post('http://localhost:3000/api/tasks',JSON.stringify(newTask),{headers:headers})
      .map(res => res.json());

  }
  deleteTask(id){
    return this._http.delete('http://localhost:3000/api/tasks/'+id)
      .map(res => res.json());
  }
  updateStatus(task){
    var headers =new Headers();
    headers.append('Content-Type','application/json');
    return this._http.put('http://localhost:3000/api/tasks/'+task._id,JSON.stringify(task),{headers:headers})
      .map(res => res.json());
  }
}
