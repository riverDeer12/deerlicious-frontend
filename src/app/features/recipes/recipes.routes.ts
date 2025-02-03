import {Route, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {CreateRecipeComponent} from "./pages/create-recipe/create-recipe.component";
import {UpdateRecipeComponent} from "./pages/update-recipe/update-recipe.component";

export const RecipesRoutes: Routes = [
    {
        path: '',
        component: RecipesComponent
    },
    {
        path: 'create',
        component: CreateRecipeComponent
    },
    {
        path: 'update/:recipeId',
        component: UpdateRecipeComponent
    }
]
