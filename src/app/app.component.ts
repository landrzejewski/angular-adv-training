import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {PaymentConfirmationComponent} from "./payments/payment-confirmation/payment-confirmation.component";
import {NgComponentOutlet} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgComponentOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  confirmationView: any = undefined;

  async showConfirmation() {
    this.confirmationView = await import('./payments/payment-confirmation/payment-confirmation.component')
      .then(component => component.PaymentConfirmationComponent)
  }

}
