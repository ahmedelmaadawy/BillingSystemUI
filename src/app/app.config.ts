import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import {  provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this import

import { routes } from './app.routes';
import { customInterceptor } from './Services/custominterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([customInterceptor])),
    importProvidersFrom(MatSnackBarModule, BrowserAnimationsModule),
  ],
};
