import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interceptor/error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environment/environment';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: `${environment.baseURL}/${environment.GraphQLURL}`,
        }),
        cache: new InMemoryCache(),
      };
    }),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
};
