import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialLoaderModule } from './material-loader/material-loader.module';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faPlus, faSort } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListComponent, AddEditItemDialog } from './list/list.component';
import { StorageServiceModule } from 'ngx-webstorage-service';

@NgModule({
  entryComponents: [
    ListComponent,
    AddEditItemDialog,
  
  ],  
  declarations: [
    AppComponent,
    ListComponent,
    AddEditItemDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialLoaderModule,
    FormsModule,
    FontAwesomeModule,
    StorageServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
  // Add an icon to the library for convenient access in other components
  library.add(faCoffee);
  library.add(faSort);
  library.add(faPlus);
  }
}
