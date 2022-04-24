import { MessagesComponent } from './Shared/messages/messages.component';
import { ListComponent } from './Shared/list/list.component';
import { MemberDetalisComponent } from './members/member-detalis/member-detalis.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_gurads/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        canActivate: [AuthGuard],
      },
      { path: 'members/:id', component: MemberDetalisComponent },
      { path: 'lists', component: ListComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },

  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
