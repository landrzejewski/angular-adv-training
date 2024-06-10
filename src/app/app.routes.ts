import { Routes } from '@angular/router';
import {RxExamplesComponent} from "./rxjs/rx-examples/rx-examples.component";

export const routes: Routes = [
  {
    path: '',
    component: RxExamplesComponent,
  },
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
    },
    providers: [] // pozwala na zdefiniowanie zależności dla danej ścieżki współdzielonych np. przez wiele komponentów (jak w przypadku modułów)
  }
];
