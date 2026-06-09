import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
     // Configurer le client HTTP pour utiliser ton intercepteur
    provideHttpClient(
      withInterceptors([jwtInterceptor]) //  C'est ici que l'intercepteur s'active !
    )
  ]
};

