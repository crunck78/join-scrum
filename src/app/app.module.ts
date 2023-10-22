import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';
import { MaterialModule } from './shared/modules/material/material.module';

const imports = [
  CommonModule,
  MaterialModule,
  SideComponent,
  HeaderComponent,
  MainComponent,
];

@NgModule({
  declarations: [],
  imports: [...imports],
  exports: [...imports]
})
export class AppModule { }
