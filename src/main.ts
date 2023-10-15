import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ScrumApiModule } from './app/scrum-api/scrum-api.module';
import { LayoutModule } from '@angular/cdk/layout';
import { routes } from './app/shared/routes';
import { interceptorProviders } from './app/shared/interceptor-providers';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            HttpClientModule,
            ScrumApiModule,
            BrowserAnimationsModule,
            LayoutModule,
            MatDialogModule,
            MatSnackBarModule
        ),
        provideRouter(routes),
        interceptorProviders,
    ]
});
