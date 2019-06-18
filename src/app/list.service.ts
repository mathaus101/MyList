import { Injectable } from '@angular/core';
import { ListItem } from './list-item';
import { ITEMS_SEED } from './items-seed';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { LocStorageService } from './loc-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  private items: ListItem[];

  constructor(private local: LocStorageService) { 
    this.items = this.local.getFromLocalStorage();

  }  

  addItem(item: ListItem) {
    this.items.unshift(item);
    //this.local.storeOnLocalStorage(item);
    this.save();
    
  }

  deleteItem(index) {
    //this.items.de
  }

  save() {
    this.local.saveToLocalStorage(this.items);
    console.log('SAVED!');
  }

  moveItem(oldIndex: number, newIndex: number) {
    moveItemInArray(this.items, oldIndex, newIndex);
    this.save();
    //this.local.moveItem(oldIndex, newIndex);
  }

  getItems(): ListItem[] {
    
    //console.log(this.items || 'Array is empty');    
    //console.log(this.local.getFromLocalStorage() || 'Array is empty');    
    //return this.local.getFromLocalStorage();
    return this.items;
  }
}
