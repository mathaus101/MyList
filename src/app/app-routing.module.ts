import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
//{  path: 'form1', component: FirstFormComponent },
//{ path: 'form2', component: HeroFormComponent },
// { path: '', redirectTo: '/form1', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
