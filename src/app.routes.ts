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
import {CategoriesRoutes} from "./app/features/categories/categories.routes";

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: 'categories',
                loadChildren: () =>
                    import('./app/features/categories/categories.routes')
                        .then((m) => m.CategoriesRoutes),
            },
            {
                path: 'recipes',
                loadChildren: () =>
                    import('./app/features/recipes/recipes.routes')
                        .then((m) => m.RecipesRoutes),
            },
            {
                path: 'administrators',
                loadChildren: () =>
                    import('./app/features/administrators/administrators.routes')
                        .then((m) => m.AdministratorsRoutes),
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('./app/features/users/users.routes')
                        .then((m) => m.UsersRoutes),
            },
            {path: '', component: Dashboard},
            {path: 'pages', loadChildren: () => import('./app/pages/pages.routes')}
        ]
    },
    {path: 'landing', component: Landing},
    {path: 'notfound', component: Notfound},
    {path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes')},
    {path: '**', redirectTo: '/notfound'}
];
