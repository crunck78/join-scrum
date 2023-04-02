import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PageComponent } from '../admin/page/page.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PageComponent, CommonModule]
})
export class MainComponent {

}
