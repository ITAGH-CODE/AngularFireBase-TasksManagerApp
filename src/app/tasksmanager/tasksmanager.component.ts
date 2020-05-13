import { Component, OnInit } from '@angular/core';
import { AddlistPopUpComponent } from '../addlist-pop-up/addlist-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskpopupComponent } from '../addtaskpopup/addtaskpopup.component';
import { TasksmanagerService } from '../tasksmanager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-tasksmanager',
  templateUrl: './tasksmanager.component.html',
  styleUrls: ['./tasksmanager.component.css']
})

export class TasksmanagerComponent implements OnInit {

  constructor(public dialog: MatDialog 
            , private _service: TasksmanagerService
            , private _snackBar: MatSnackBar) { }


  displayedColumns: string[] = ['taskName', 'action'];
  displayedColumnsList: string[] = ['listName', 'action'];
  listSource: any[];
  tasksSource: any[];
  selectIdList: string;
  selectedListName: string;
  addTaskButtonDisabled: boolean;



  openAddListDialog(): void {
    const dialogRef = this.dialog.open(AddlistPopUpComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddtaskpopupComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  onEdit(row){
    this._service.populateForm(row);
    this.openAddListDialog();
  }

  onEditTask(row){
    this._service.populateFormTask(row);
    this.openAddTaskDialog();
  }

  onDelete($key: string){
    this._service.deleteList($key);
    this.openSnackBar(SnackBarDeleteMessageComponent);
  }

  onDeleteTask($key: string){
    this._service.deleteTask($key);
    this.openSnackBar(SnackBarDeleteTaskMessageComponent);
  }

  openSnackBar(MyComponent) {
    this._snackBar.openFromComponent(MyComponent, {
      duration: 1000,
    });
  }

  ngOnInit(): void {
    this.getLists();
    this.addTaskButtonDisabled = true;
    this.getTasks();
  }

  getSelectedListId(idList: string, selectedlist: string){
    this._service.getSelectedListId(idList, selectedlist);
    this.selectIdList = idList;
    this.selectedListName = selectedlist;
    this.addTaskButtonDisabled = false;
    this.getTasks();
  }

  getTasks(){
    this._service.getTasks().snapshotChanges() 
    .subscribe(item => {
      this.tasksSource = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        var idlist = this._service.selectedListId;
        if(idlist != null && x["idList"] == idlist){
          this.tasksSource.push(x);
        }
      })
    });
  }

  getLists(){
    this._service.getLists().snapshotChanges()
    .subscribe(item => {
      this.listSource = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listSource.push(x);
      })
    });
  }

  taskDone(row){
    row.isDone = !row.isDone;
    this._service.updateTask(row);
  }

  getStyles(isDone){
    let myStyles = {
      textDecoration: 'line-through',
      color: '#006400'
    }
    if(isDone==true){
      return myStyles;
    }
  }

  activeListStyle(idList){
    let myStyle = {
      backgroundColor : '#ccc'
    }
    if(idList == this._service.selectedListId){
      return myStyle;
    }
  }

  getStylesIfListDone(idList){
    
  }

}

@Component({
  template: `<span>List deleted successfuly</span>`
})
export class SnackBarDeleteMessageComponent{}

@Component({
  template: `<span>Task deleted successfuly</span>`
})
export class SnackBarDeleteTaskMessageComponent{}


