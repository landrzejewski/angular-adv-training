import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgComponentOutlet} from "@angular/common";
import {FakeAuthService} from "./security/fake-auth.service";
import {AUTH_SERVICE} from "./di/tokens";
import {SignalsExamplesService} from "./signals/signals-examples.service";
import {UiExampleComponent} from "./signals/ui-example/ui-example.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgComponentOutlet, UiExampleComponent],
  providers: [
    {
      // provide: 'authService',
      provide: AUTH_SERVICE,
      useClass: FakeAuthService
    }
  ],
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

  /*constructor(@Optional() /!*@Inject('authService')*!/ @Inject(AUTH_SERVICE) private auth: AuthService) {
  }*/

  private authService = inject(AUTH_SERVICE, {optional: true});
  private signalsExamples = inject(SignalsExamplesService);

  constructor() {
    // console.log(isAuthenticated());
    this.signalsExamples.test();
  }

  async showConfirmation() {
    this.confirmationView = await import('./payments/payment-confirmation/payment-confirmation.component')
      .then(component => component.PaymentConfirmationComponent)
  }

  onValueUpdated(value: string) {

  }

}
