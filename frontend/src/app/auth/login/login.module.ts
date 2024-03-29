import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
