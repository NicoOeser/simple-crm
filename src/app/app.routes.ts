import { Component, Input } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, },
    { path: 'dashboard', component: DashboardComponent, },
    { path: 'customer', component: CustomerComponent, },
    { path: 'customer/:id', component:CustomerDetailComponent, },
    { path: 'product', component: ProductsComponent, },
    { path: 'task', component: TaskComponent, },
    { path: 'order', component: OrdersComponent, },
    { path: 'imprint', component:ImprintComponent, },
];

