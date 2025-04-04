import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'test', loadChildren: () => import('app/modules/test/test.module').then(m => m.TestModule) },
            { path: 'test2', loadChildren: () => import('app/modules/test2/test2.module').then(m => m.Test2Module) },
        ]
    },

    // Authenticated routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            layout: 'compact'
        },
        children: [

            { path: 'dashboard', loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },

            // 404 & Catch all
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    },
];
