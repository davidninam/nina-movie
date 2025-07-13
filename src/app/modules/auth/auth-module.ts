import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

/**
 * Auth Module
 * Follows Single Responsibility Principle - handles only authentication features
 * Follows Open/Closed Principle - can be extended with new auth components
 */
@NgModule({
  declarations: [
    Login,
    Register
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
