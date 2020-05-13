import { Component, OnInit } from '@angular/core';
import { TasksmanagerService } from '../tasksmanager.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addtaskpopup',
  templateUrl: './addtaskpopup.component.html',
  styleUrls: ['./addtaskpopup.component.css']
})
export class AddtaskpopupComponent implements OnInit {

  formTask: FormGroup;
  isEdit: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddtaskpopupComponent>
             ,private _service: TasksmanagerService
             ,private _snackBar: MatSnackBar
             ) { }
  
  ngOnInit(){
    this.formTask = this._service.formTask;
    if(this.formTask.value.$key != null){
      this.isEdit = true;
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarTaskMessageComponent, {
      duration: 1000,
    });
  }
  
  onSubmit(form){
    if(form.$key != null){
      this._service.updateTask(form);
    }
    else{
      this._service.insertTask(form);
    }
    this._service.initializeFormTask();
    this.openSnackBar();
    this.dialogRef.close();
  }

}


@Component({
  template: `<span>Task submitted successfuly</span>`
})

export class SnackBarTaskMessageComponent{}