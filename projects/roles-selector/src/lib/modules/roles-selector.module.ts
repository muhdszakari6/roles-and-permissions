import { NgModule } from '@angular/core';
import { RolesSelectorComponent } from '../components/roles-selector.component';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';

import { MatBadgeModule } from '@angular/material/badge';






@NgModule({
  declarations: [
    RolesSelectorComponent
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatButtonModule,
    MatBadgeModule


  ],
  exports: [
    RolesSelectorComponent
  ]
})
export class RolesSelectorModule { }
