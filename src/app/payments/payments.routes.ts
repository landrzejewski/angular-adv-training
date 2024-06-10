import {Routes} from '@angular/router';
import {PaymentComponent} from "./payment/payment.component";
import {PaymentSummaryComponent} from "./payment-summary/payment-summary.component";

export const routes: Routes = [
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'payment-summary',
    component: PaymentSummaryComponent
  }
];
