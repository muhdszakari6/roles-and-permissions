import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materials } from './angular-material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTreeSelectInputModule } from 'mat-tree-select-input';

import { RolesSelectorModule } from 'projects/roles-selector/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RolesSelectorModule,
    CommonModule,
    ReactiveFormsModule,
    MatTreeSelectInputModule,
    FormsModule,
    ...materials
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
