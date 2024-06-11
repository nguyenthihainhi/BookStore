import { Routes } from '@angular/router';
import { ListAuthorComponent } from './list-author/list-author.component';
import { ListPublisherComponent } from './list-publisher/list-publisher.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: ListAuthorComponent},
    {path: 'publisher', component: ListPublisherComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];
