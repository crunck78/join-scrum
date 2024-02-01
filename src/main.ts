import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { interceptorProviders } from './app/interceptor-providers';
import { routes } from './app/shared/routes';
import { MaterialModule } from './app/shared/modules/material/material.module';

bootstrapApplication(AppComponent,
    {
        providers: [
            importProvidersFrom(
                [
                    HttpClientModule,
                    BrowserAnimationsModule,
                    MaterialModule
                ]
            ),
            provideRouter(routes),
            interceptorProviders,
        ]
    }
);
