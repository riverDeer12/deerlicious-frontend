import {Routes} from '@angular/router';
import {AppLayout} from './app/layout/component/app.layout';
import {Dashboard} from './app/pages/dashboard/dashboard';
import {Documentation} from './app/pages/documentation/documentation';
import {Landing} from './app/pages/landing/landing';
import {NotFound} from './app/components/not-found/not-found';
import {Forbidden} from './app/components/forbidden/forbidden';
import {CategoriesComponent} from "./app/features/categories/categories.component";
import {RecipesComponent} from "./app/features/recipes/recipes.component";
import {AdministratorsComponent} from "./app/features/administrators/administrators.component";
import {UsersComponent} from "./app/features/users/users.component";
import {CategoriesRoutes} from "./app/features/categories/categories.routes";
import {Error} from "./app/components/error/error";

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            {path: '', component: Dashboard},
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
            }
        ]
    },
    {
        path: 'authentication',
        loadChildren: () =>
            import('./app/features/authentication/authentication.routes')
                .then((m) => m.AuthenticationRoutes),
    },
    {path: 'landing', component: Landing},
    {path: 'not-found', component: NotFound},
    {path: 'forbidden', component: Forbidden},
    {path: 'error', component: Error},
    {path: '**', redirectTo: '/not-found'}
];
