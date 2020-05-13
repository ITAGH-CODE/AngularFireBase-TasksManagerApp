import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { List } from './list';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class TasksmanagerService {

  listOfLists: AngularFireList<any>;
  listOfTasks: AngularFireList<any>;
  selectedListId: string = null;
  selectedListName: string = null;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    listName: new FormControl('', Validators.required),
    isDone: new FormControl(false)
  });

  formTask: FormGroup = new FormGroup({
    $key: new FormControl(null),
    taskName: new FormControl('', Validators.required),
    isDone: new FormControl(false)
  });

  constructor(private firebase: AngularFireDatabase) { }

  getLists(){
    this.listOfLists = this.firebase.list('lists');
    return this.listOfLists;
  }

  getTasks(){
    this.listOfTasks = this.firebase.list('tasks');
    return this.listOfTasks;
  }

  insertList(list){
    this.listOfLists.push({
      listName: list.listName,
      isDone: false
    });
  }

  insertTask(task){
    this.listOfTasks.push({
      taskName: task.taskName,
      isDone: false,
      idList: this.selectedListId
    });
  }

  updateList(list){
    this.listOfLists.update(list.$key,{
      listName: list.listName,
      isDone: list.isDone
    });
    this.selectedListName = list.listName;
  }

  updateTask(task){
    this.listOfTasks.update(task.$key,{
      taskName: task.taskName,
      isDone: task.isDone
    });
  }

  deleteList($key: string){
    this.listOfLists.remove($key);
  }

  deleteTask($key: string){
    this.listOfTasks.remove($key);
  }

  initializeForm(){
    this.form.reset();
  }

  initializeFormTask(){
    this.formTask.reset();
  }

  populateForm(list: List){
    this.form = new FormGroup({
      $key: new FormControl(list.$key),
      listName: new FormControl(list.listName, Validators.required),
      isDone: new FormControl(list.isDone)
    });
  }

  populateFormTask(task: Task){
    this.formTask = new FormGroup({
      $key: new FormControl(task.$key),
      taskName: new FormControl(task.taskName, Validators.required),
      isDone: new FormControl(task.isDone)
    });
  }

  getSelectedListId(idList: string, listName: string){
    this.selectedListId = idList;
    this.selectedListName = listName;
  }

}
