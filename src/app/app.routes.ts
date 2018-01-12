import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { IssuesComponent } from './issues';
import { ProfileComponent } from './profile';
import { SigninComponent } from './signin';
import { IssueDetailComponent } from './issues';
/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
export const AppRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/issues' },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'issues',  component: IssuesComponent },
    { path: 'detail/:id',  component: IssueDetailComponent },
    { path: 'profile',  component: ProfileComponent },
    { path: 'signin',  component: SigninComponent }
];
