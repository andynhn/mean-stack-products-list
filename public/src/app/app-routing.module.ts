import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './list/new/new.component';
import { EditComponent } from './list/edit/edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ListComponent, children: [
      { path: 'new', component: NewComponent },
      { path: 'edit/:id', component: EditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
