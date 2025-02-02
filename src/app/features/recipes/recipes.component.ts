import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Table, TableModule} from "primeng/table";
import {Recipe} from "./components/models/recipe";
import {RecipeService} from "./components/services/recipe.service";

@Component({
    selector: 'app-recipes',
    imports: [
        ButtonDirective,
        IconField,
        InputIcon,
        InputText,
        TableModule
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
