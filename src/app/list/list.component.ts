import { Component, OnInit, Inject } from '@angular/core';
import { ListService } from '../list.service';
import { ListItem } from '../list-item';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild
  // ...
} from '@angular/animations';

export interface DialogData
{
  item: ListItem;
  toDoText?: string;
  newItem: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [

    trigger('items', [

      transition( ':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
      animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
        style({ transform: 'scale(1)', opacity: 1 }))  // final])
      ]),
      
      transition( ':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
         style({ 
           transform: 'scale(0.5)', opacity: 0, 
           height: '0px', margin: '0px' 
         })) 
      ])      
    ]),

    trigger('list', [
      transition(':enter', [
        query('@items', stagger(150, animateChild()))
      ])
    ]),


  ]
})
export class ListComponent implements OnInit {

  private durationInSeconds = 3;

  constructor(public listService: ListService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    //this.myList = this.listService.getItems();
  }

  // addToList(text: string) {
  //   this.listService.addItem(new ListItem(text));
  //   //this.myList.unshift(this.newItem); 
  
  // }

  addToList(item: ListItem) {
    this.listService.addItem(item); 
    //this.myList.unshift(this.newItem); 
  
  }

  deleteItem(itemIndex: number) {
    this.listService.deleteItem(itemIndex);
    this.openDeletedSnackBar();
    
  }


  checked() {
    console.log('item checked. saving...');
    this.listService.save();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.listService.moveItem(event.previousIndex, event.currentIndex);    
  }

  openDeletedSnackBar() {
    this.snackBar.openFromComponent(ItemDeletedComponent, {
      duration: this.durationInSeconds * 1000,
    });  
  }

  openDialog(item?: ListItem) {

    if (item == null)
      console.log('Null ListItem...')

    const dialogRef = this.dialog.open(AddEditItemDialog, {
      width: '80vw',
      data: {item: (item == null) ? new ListItem('', false) : item,
             toDoText: ( item == null ) ? '' : item.text,  // need separate var to hold the text
             newItem: item == null }
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
      if (result) //result may be null
      {
        result.item.text = result.toDoText; //Make the change official (only update the object if user Okays it)
         
        if (result.newItem)            
          this.addToList(result.item);

          
        else
          this.listService.save(); //Save change in to listITme referneced by the array
      }


      
    });
  }
}

@Component({
  selector: 'add-edit-item-dialog',
  templateUrl: 'add-edit-item-dialog.html',
})
export class AddEditItemDialog {

  constructor(
    public dialogRef: MatDialogRef<AddEditItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

@Component({
  selector: 'deleted-notification',
  templateUrl: 'deleted-notification.html',
  styles: [`
    .deleted-notification {
      color: hotpink;
    }
  `],
})
export class ItemDeletedComponent {}


