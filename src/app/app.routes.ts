import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, },
    { path: 'dashboard', component: DashboardComponent, },
    { path: 'customer', component: CustomerComponent, },
    { path: 'customer/:id', component:CustomerDetailComponent, },
    { path: 'task', component: TaskComponent, },
    { path: 'opportunities', component: OpportunitiesComponent, },

];

