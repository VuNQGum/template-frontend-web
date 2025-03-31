import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test2Component } from './test2.component';
import { Route, RouterModule } from '@angular/router';
import { TestHcmcLibraryModule } from 'test-hcmc-library';

const routes: Route[] = [
    {
      path: '',
      component: Test2Component,
    }
  ];

@NgModule({
  declarations: [
    Test2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TestHcmcLibraryModule
  ],
  exports: [
    RouterModule
  ]
})
export class Test2Module { }
