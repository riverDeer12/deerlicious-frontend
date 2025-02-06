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
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToggleButtonModule} from "primeng/togglebutton";
import {Category} from "./models/category";
import {CategoryService} from "./services/category.service";
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DialogService} from "primeng/dynamicdialog";
import {DialogFormComponent} from "../../components/dialog-form/dialog-form.component";

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
        RouterLink,
        DatePipe
    ],
    providers: [
        DialogService
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    @Input() categories!: Category[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor(private categoryService: CategoryService, private dialogService: DialogService) {
    }

    ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe((response: Category[]) => {
            this.categories = response.map((x: Category) =>
                Object.assign(new Category(), x)
            );
        })
    }

    openInfoDialog(category: any) {
        const dialogRef = this.dialogService.open(DialogFormComponent, {
            header: 'Select a Product',
            width: '50vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });
    }

    openUpdateDialog(category: any) {
        const dialogRef = this.dialogService.open(DialogFormComponent, {
            header: 'Select a Product',
            width: '50vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });
    }

    openDeleteDialog(category: any) {
        const dialogRef = this.dialogService.open(DialogFormComponent, {
            header: 'Select a Product',
            width: '50vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });
    }
}
