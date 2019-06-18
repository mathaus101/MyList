import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ListItem } from './list-item';
import { ITEMS_SEED } from './items-seed';

const STORAGE_KEY = 'local_todolist';

@Injectable({
  providedIn: 'root'
})
export class LocStorageService {


  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public saveToLocalStorage(li: ListItem[]) {
    this.storage.set(STORAGE_KEY, li);
  }

  // public storeOnLocalStorage(task: ListItem): void {
       
  //      // get array of tasks from local storage
  //      const currentTodoList = this.storage.get(STORAGE_KEY) || [];

  //      // push new task to array
  //      currentTodoList.push({
  //          text: task.text,
  //          ticked: task.ticked
  //      });

  //      // insert updated array to local storage
  //      this.storage.set(STORAGE_KEY, currentTodoList);

  //      console.log(this.storage.get(STORAGE_KEY) || 'Local storage is empty');
  // }

  public getFromLocalStorage(): ListItem[] {

    return this.storage.get(STORAGE_KEY) || [];
  }

  // public moveItem(oldIndex: number, newIndex: number) {
  //   // get array of tasks from local storage
  //   const currentTodoList = this.storage.get(STORAGE_KEY) || [];    
    
  //   moveItemInArray(currentTodoList, oldIndex, newIndex);

  //   this.storage.set(STORAGE_KEY, currentTodoList);

  //   console.log(this.storage.get(STORAGE_KEY) || 'Local storage is empty');    




  // }



}
