import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ButtonDirective, ButtonModule} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {ProgressBarModule} from "primeng/progressbar";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {SelectModule} from "primeng/select";
import {SliderModule} from "primeng/slider";
import {Table, TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToggleButtonModule} from "primeng/togglebutton";
import {Category} from "./models/category";
import {CategoryService} from "./services/category.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        ButtonModule,
        ButtonDirective,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        MultiSelectModule,
        ProgressBarModule,
        RatingModule,
        RippleModule,
        SelectModule,
        SliderModule,
        TableModule,
        TagModule,
        ToggleButtonModule,
        RouterLink
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    @Input() categories!: Category[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe((response: Category[]) => {
            this.categories = response.map((x: Category) =>
                Object.assign(new Category(), x)
            );
        })
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
