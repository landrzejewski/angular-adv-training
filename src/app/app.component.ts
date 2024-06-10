import {Component, Inject, Optional} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgComponentOutlet} from "@angular/common";
import {AuthService} from "./security/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgComponentOutlet],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  confirmationView: any = undefined;

  /*
    Możliwe jest użycie dodatkowych dekoratorów/konfiguracji wstrzykiwania:

      @Optional - zależność jest opcjonalna, nie wołamy/używamy NullInjector
      @Self - zależność musi być zdefiniowana na poziomie komponentu, inaczej wołamy NullInjector
      @SkipSelf - pomijamy injector na poziomie elementu i próbujemy użyć injector rodzica
      @Host - szukamy zależności na poziomie komponentu i najbliższego rodzica

   */

  constructor(@Optional() private auth: AuthService) {
  }

  async showConfirmation() {
    this.confirmationView = await import('./payments/payment-confirmation/payment-confirmation.component')
      .then(component => component.PaymentConfirmationComponent)
  }

}
