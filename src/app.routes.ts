import {Routes} from '@angular/router';
import {AppLayout} from './app/layout/component/app.layout';
import {Dashboard} from './app/pages/dashboard/dashboard';
import {Documentation} from './app/pages/documentation/documentation';
import {Landing} from './app/pages/landing/landing';
import {Notfound} from './app/pages/notfound/notfound';
import {CategoriesComponent} from "./app/features/categories/categories.component";
import {RecipesComponent} from "./app/features/recipes/recipes.component";
import {AdministratorsComponent} from "./app/features/administrators/administrators.component";
import {UsersComponent} from "./app/features/users/users.component";

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            {path: '', component: Dashboard},
            {path: 'categories', component: CategoriesComponent},
            {path: 'recipes', component: RecipesComponent},
            {path: 'administrators', component: AdministratorsComponent},
            {path: 'users', component: UsersComponent},
            {path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes')},
            {path: 'documentation', component: Documentation},
            {path: 'pages', loadChildren: () => import('./app/pages/pages.routes')}
        ]
    },
    {path: 'landing', component: Landing},
    {path: 'notfound', component: Notfound},
    {path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes')},
    {path: '**', redirectTo: '/notfound'}
];
