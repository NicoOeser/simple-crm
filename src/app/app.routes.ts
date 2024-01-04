import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TaskComponent } from './task/task.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, },
    { path: 'dashboard', component: DashboardComponent, },
    { path: 'user', component: UserComponent, },
    { path: 'user/:id', component: UserDetailComponent, },
    { path: 'task', component: TaskComponent, },
    { path: 'opportunities', component: OpportunitiesComponent, },

];

