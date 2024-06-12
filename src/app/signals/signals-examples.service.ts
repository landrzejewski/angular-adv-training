import {computed, effect, inject, Injectable, Injector, signal, untracked} from "@angular/core";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class SignalsExamplesService {

  counter = signal(0);
  numbers = signal<number[]>([1, 2, 3]);

  injector = inject(Injector);

  test(): void {
    console.log(this.counter());
    console.log(this.numbers());

    this.counter.set(1);
    this.numbers.set([0, 1, 2]);

    console.log(this.counter());
    console.log(this.numbers());

    this.counter.update(value => value + 1);
    this.numbers.update(value => [...value, 3]);

    const increment = () => this.counter.update(value => value + 1);
    increment();

    console.log(this.counter());
    console.log(this.numbers());

    const doubledCounter = computed(() => {
      console.log('Recalculating...');
      return this.counter() * 2;
    });

    console.log(doubledCounter());
    console.log(doubledCounter());
    increment();
    console.log(doubledCounter());

    const a = signal(1);
    const b = signal(2);
    const sum = computed(() => a() + untracked(b));
    const doubledSum = computed(() => sum() * 2);
    console.log(doubledSum());

    const effectRef = effect(() => {
      console.log('Counter value: ' + this.counter())
    }, {injector: this.injector}) // ustawienie injectora wymagane tylko jeśli nie jesteśmy w injection scope;
    // effectRef.destroy(); // opcja, destroy jest wołane automatycznie

    setTimeout(() => increment(), 5_000);

    const effectRef2 = effect((onCleanup) => {
      const timeout = setTimeout(() => {
        console.log('Timeout with value: ' + this.counter());
      }, 1_000);
      onCleanup(() => clearTimeout(timeout));
    });
    effectRef2.destroy();

    const user = signal({
      id: 1,
      firstName: 'Jan',
      lastName: 'Kowalski',
      age: 20
    }, {equal: (user, otherUser) => user.id === otherUser.id});

    const userInfo = computed(() => {
      console.log('Recalculating...');
      return user().firstName + ' ' + user().lastName + ', age: ' + user().age;
    });

    console.log(userInfo());

    user.set({
      id: 1,
      firstName: 'Jan',
      lastName: 'Kowalski',
      age: 20
    });

    console.log(userInfo());

    const counter$ = toObservable(this.counter);
    const counterSignal = toSignal(counter$, {initialValue: 1});
    const readOnlyCounterSignal = this.counter.asReadonly();

  }

}
