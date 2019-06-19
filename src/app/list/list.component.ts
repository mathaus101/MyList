import { Component, OnInit, Inject } from '@angular/core';
import { ListService } from '../list.service';
import { ListItem } from '../list-item';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
//   // ...
// } from '@angular/animations';

export interface DialogData
{
  item: ListItem;
  newItem?: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  

  constructor(public listService: ListService,
              public dialog: MatDialog) { 
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


  checked() {
    console.log('item checked. saving...');
    this.listService.save();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.listService.moveItem(event.previousIndex, event.currentIndex);    
  }

  openDialog(item?: ListItem) {

    if (item == null)
    {
      console.log('Null ListItem...')
      
    }
      
    const dialogRef = this.dialog.open(AddEditItemDialog, {
      width: '80vw',
      data: {item: (item == null) ? new ListItem('', false) : item,
             newItem: item == null }
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
      if (result) //result may be null
      {
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


