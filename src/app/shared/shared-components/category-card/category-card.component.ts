import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryResponse } from '../../models/category.model';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category !: Partial<CategoryResponse> | null;
}
