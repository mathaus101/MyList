import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule, matFormFieldAnimations, } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({

  imports: [
    DragDropModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatCheckboxModule,

  ],
  exports: [ 
    DragDropModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,    
  ]
})
export class MaterialLoaderModule { }
