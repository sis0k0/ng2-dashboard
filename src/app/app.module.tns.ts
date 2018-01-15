import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// nativescript
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES, SHARED_PROVIDERS } from './app.common';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        ...SHARED_MODULES
    ],
    declarations: [
        AppComponent,
        SigninComponent,
        // SegmentedBarDirective,
        // ActionBarDirective,
        // SearchBarDirective
    ],
    providers: [
        // Allows your {N} application to use lazy-loading
        // { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
      ...SHARED_PROVIDERS,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
