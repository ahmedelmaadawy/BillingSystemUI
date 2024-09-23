import { provideRouter } from '@angular/router';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {  provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';


import { routes } from './app.routes';
import { customInterceptor } from './Services/custominterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([customInterceptor])),
  ],
};
