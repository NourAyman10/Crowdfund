import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'campaigns',
      },
      {
        path: 'campaigns',
        loadComponent: () =>
          import('./pages/campaigns/campaigns.page').then(
            (m) => m.CampaignsPage
          ),
      },
      {
        path: 'campaign-details',
        loadComponent: () =>
          import('./pages/campaign-details/campaign-details.page').then(
            (m) => m.CampaignDetailsPage
          ),
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./pages/not-found/not-found.page').then(
            (m) => m.NotFoundPage
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
