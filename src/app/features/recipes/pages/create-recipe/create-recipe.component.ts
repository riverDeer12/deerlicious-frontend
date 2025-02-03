import {Component} from '@angular/core';
import {FormType} from "../../../../enums/form-type";
import {RecipeFormComponent} from "../../components/recipe-form/recipe-form.component";

@Component({
    selector: 'app-create-recipe',
    imports: [
        RecipeFormComponent
    ],
    standalone: true,
    templateUrl: './create-recipe.component.html',
    styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {
    formType = FormType.Create;
}
