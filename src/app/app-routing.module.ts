import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";

import {TaskPageComponent} from "./task-page/task-page.component";


const routes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'task', component: TaskPageComponent}
    ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
