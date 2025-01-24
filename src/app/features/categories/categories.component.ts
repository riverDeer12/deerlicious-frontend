import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ButtonDirective, ButtonModule} from "primeng/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
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

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        ButtonModule,
        ButtonDirective,
        CurrencyPipe,
        DatePipe,
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
        ToggleButtonModule
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    @Input() categories!: Category[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor() {
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
