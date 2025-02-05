import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Table, TableModule} from "primeng/table";
import {Recipe} from "./models/recipe";
import {RecipeService} from "./services/recipe.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-recipes',
    imports: [
        ButtonDirective,
        IconField,
        InputIcon,
        InputText,
        TableModule,
        Button,
        RouterLink
    ],
    standalone: true,
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
    @Input() recipes!: Recipe[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor(private recipeService: RecipeService) {
    }

    ngOnInit(): void {
        this.recipeService.getAllRecipes().subscribe((response: Recipe[]) => {
            this.recipes = response.map((x: Recipe) =>
                Object.assign(new Recipe(), x)
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
