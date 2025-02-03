import {Routes} from "@angular/router";
import {CategoriesComponent} from "./categories.component";
import {CreateCategoryComponent} from "./pages/create-category/create-category.component";
import {UpdateCategoryComponent} from "./pages/update-category/update-category.component";

export const CategoriesRoutes: Routes = [
    {
        path: '',
        component: CategoriesComponent
    },
    {
        path: 'create',
        component: CreateCategoryComponent
    },
    {
        path: 'update/:categoryId',
        component: UpdateCategoryComponent
    }
]
