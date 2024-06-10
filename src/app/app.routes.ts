import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'registration',
    loadComponent: () => import('./security/registration/registration.component')
     // .then(mod => mod.RegistrationComponent)  // trzeba dodać jeśli eksport komponentu nie jest robiony przez default
  },
  {
    path: 'payments',
    loadChildren: async () => {
      let path = await import("./payments/payments.routes")
      return path.routes;
    }
  }
];
