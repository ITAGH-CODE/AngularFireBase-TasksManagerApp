import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule, MatListItem } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TasksmanagerComponent } from './tasksmanager/tasksmanager.component';
import { AddlistPopUpComponent } from './addlist-pop-up/addlist-pop-up.component';
import { AddtaskpopupComponent } from './addtaskpopup/addtaskpopup.component';
import { environment } from '../environments/environment';
import { TasksmanagerService } from './tasksmanager.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksmanagerComponent,
    AddlistPopUpComponent,
    AddtaskpopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TasksmanagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
