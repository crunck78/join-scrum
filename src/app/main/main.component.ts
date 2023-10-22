import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { PageComponent } from '../shared/shared-components/page/page.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PageComponent, CommonModule]
})
export class MainComponent {

}
