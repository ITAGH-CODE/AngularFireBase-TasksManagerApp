import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { TasksmanagerService } from '../tasksmanager.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-addlist-pop-up',
  templateUrl: './addlist-pop-up.component.html',
  styleUrls: ['./addlist-pop-up.component.css']
})

export class AddlistPopUpComponent implements OnInit {
  isEdit: boolean = false;
  listOfLists: any[];
  myForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddlistPopUpComponent>
             ,private _service: TasksmanagerService
             ,private _snackBar: MatSnackBar
             ,private _fb: FormBuilder
              ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.myForm = this._service.form;
    if(this.myForm.value.$key != null){
      this.isEdit = true;
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarMessageComponent, {
      duration: 1000,
    });
  }

  onSubmit(form){
    if(form.$key != null){
      this._service.updateList(form);
    }
    else{
      this._service.insertList(form);
    }
    this._service.initializeForm();
    this.openSnackBar();
    this.dialogRef.close();
  }
}


@Component({
  template: `<span>List submitted successfuly</span>`
})

export class SnackBarMessageComponent{}