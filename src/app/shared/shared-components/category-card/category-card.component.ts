import { Component, Input } from "@angular/core";

import type { CategoryResponse } from "../../models/category.model";

@Component({
	selector: "app-category-card",
	imports: [],
	templateUrl: "./category-card.component.html",
	styleUrls: ["./category-card.component.scss"],
})
export class CategoryCardComponent {
	@Input() category!: Partial<CategoryResponse> | null;
}
