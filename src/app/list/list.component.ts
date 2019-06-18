import { Component, OnInit, Inject } from '@angular/core';
import { ListService } from '../list.service';
import { ListItem } from '../list-item';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData
{
  typeDesc: string;
  toDoText: string;
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

  addToList(text: string) {
    this.listService.addItem(new ListItem(text));
    //this.myList.unshift(this.newItem); 
  
  }

  checked() {
    console.log('item checked. saving...');
    this.listService.save();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.listService.moveItem(event.previousIndex, event.currentIndex);    
  }

  openDialog(typeDesc: string) {
    const dialogRef = this.dialog.open(AddEditItemDialog, {
      width: '80vw',
      data: {typeDesc: typeDesc}
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
      if (result) 
        this.addToList(result);

      
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


