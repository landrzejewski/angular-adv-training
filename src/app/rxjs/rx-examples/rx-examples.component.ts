import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, fromEvent, interval, map, Observable, of, startWith, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-rx-examples',
  standalone: true,
  imports: [],
  templateUrl: './rx-examples.component.html',
  styleUrl: './rx-examples.component.css'
})
export class RxExamplesComponent implements AfterViewInit {

  // Operators

  // of - Converts the arguments to an observable sequence
  // interval - Creates an Observable that emits sequential numbers every specified interval of time
  // timer - Creates an observable that will wait for a specified time period, or exact date, before emitting the value
  //         or creates an Observable that emits sequential numbers every specified interval of time with initial delay
  // range - Creates an Observable that emits a sequence of numbers within a specified range
  // fromEvent - Creates an Observable that emits events of a specific type coming from the given event target
  // fromPromise - Crates an Observable from Promise

  // map - Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable
  // filter - Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate
  // reduce - Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value
  // scan - Useful for encapsulating and managing state. Applies an accumulator (or "reducer function") to each value from the source after an initial state is established
  // tap - Used to perform side-effects for notifications from the source observable
  // delay - Delays the emission of items from the source Observable by a given timeout or until a given Date
  // take - Emits only the first count values emitted by the source Observable
  // startWith - Returns an observable that, at the moment of subscription, will synchronously emit all values provided to this operator, then subscribe to the source and mirror all of its emissions to subscribers
  // debounceTime - Emits a notification from the source Observable only after a particular time span has passed without another source emission
  // throttleTime - Emits a value from the source Observable, then ignores subsequent source
  // distinctUntilChanged - Returns a result Observable that emits all values pushed by the source observable if they are distinct in comparison to the last value the result observable emitted

  // merge - Creates an output Observable which concurrently emits all values from every given input Observable
  // concat - Creates an output Observable which sequentially emits all values from the first given Observable and then moves on to the next
  // zipWith - Subscribes to the source, and the observable inputs provided as arguments, and combines their values, by index, into arrays
  // combineLatestWith - Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables

  // mergeMap - Projects each source value to an Observable which is merged in the output Observable
  // concatMap - Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next
  // exhaustMap - Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed
  // switchMap - Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable

  // forkJoin - Accepts an Array of ObservableInput or a dictionary Object of ObservableInput and returns an Observable that emits either an array of values in the exact same order as the passed array, or a dictionary of values in the same shape as the passed dictionary
  // shareReplay - Share source and replay specified number of emissions on subscription

  // https://rxjs.dev/operator-decision-tree

  @ViewChild("search")
  queryInput!: ElementRef<HTMLInputElement>;

  private httpClient = inject(HttpClient);

  ngAfterViewInit(): void {
    const multiplyBy = (multiplier: number) => (value: number) => value * multiplier;
    const isEven = (value: number) => value % 2 === 0;
    const sum = (accumulator: number, currentValue: number) => accumulator + currentValue;
    const url = 'http://localhost:3000/books';

    /*interval(1_000)
      .pipe(
        // map(value => value * 3)
        map(multiplyBy(3)),
        filter(isEven)
      )
      .subscribe({
        next: value => console.log('Next value: ' + value)
      });*/

    /*range(1, 10)
      .pipe(
        tap(value => console.log('Processing value: ' + value)),
        // reduce(sum, 0)
        scan(sum, 0)
      )
      .subscribe({
        next: value => console.log('Sum: ' + value)
      });*/

    /*const source1$ = interval(1_000)
    const source2$ = of(4, 5, 6).pipe(delay(2_000))
    merge(source1$, source2$)
      .subscribe({
        next: value => console.log('Value: ' + value)
      });*/

    /*const source1$ = of(1, 2, 3); // interval(1_000)
    const source2$ = of(4, 5, 6);
    concat(source1$, source2$)
      .subscribe({
        next: value => console.log('Value: ' + value)
      });*/

    /*of(1, 2, 3, 4)
      .pipe(
        zipWith(of(5, 7))
      )
      .subscribe({
        next: value => console.log(value)
      });*/

    /* interval(1_000)
       .pipe(
         combineLatestWith(interval(1_000))
       )
       .subscribe({
         next: value => console.log(value)
       });*/

    /*const source1$ = fromEvent(document, 'click');
    const source2$ = interval(1_000).pipe(take(3));
    source1$.pipe(
      mergeMap(event => source2$)
    )
      .subscribe({
        next: value => console.log(value)
      });*/

    /*const source1$ = fromEvent(document, 'click');
    const source2$ = interval(1_000).pipe(take(3));
    source1$.pipe(
      concatMap(event => source2$)
    )
      .subscribe({
        next: value => console.log(value)
      });*/

    /*const source1$ = fromEvent(document, 'click');
    const source2$ = interval(1_000).pipe(take(3));
    source1$.pipe(
      exhaustMap(event => source2$)
    )
      .subscribe({
        next: value => console.log(value)
      });*/

    /*const source1$ = fromEvent(document, 'click');
    const source2$ = interval(1_000).pipe(take(3));
    source1$.pipe(
      switchMap(event => source2$)
    )
      .subscribe({
        next: value => console.log(value)
      });*/

    /*forkJoin({
      one: of(1, 2, 3),
      two: Promise.resolve(8),
      three: timer(4_000)
    })
      .subscribe({
        next: value => console.log(value)
      });*/

    /*fromPromise(fetch(url))
      .pipe(
        mergeMap(response => response.json())
      )
      .subscribe({
        next: value => console.log(value)
      });*/

    /*const books$ = this.getClient(url)
      .pipe(
        tap(value => console.log('Executing request')),
        shareReplay()
      )

    books$.subscribe({
      next: value => console.log(value),
      error: err => console.log('Error: ' + err)
    });
    // .unsubscribe();

    books$.subscribe({
      next: value => console.log(value),
      error: err => console.log('Error: ' + err)
    });*/

    fromEvent(this.queryInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        //throttleTime(1_000),
        map(keyboardEvent => keyboardEvent.target as HTMLInputElement),
        map(input => input.value),
        distinctUntilChanged(),
        // mergeMap(queryText => this.createTitleQuery(queryText))
        switchMap(queryText => this.createTitleQuery(queryText)),
        startWith([{info: 'no results'}])
      )
      .subscribe({
        next: value => console.log(value),
        error: err => console.log('Error: ' + err)
      });

  }

  createTitleQuery<T>(queryText: string): Observable<T> {
    const url = `http://localhost:3000/books?title_like=${queryText}`;
    //return this.getClient(url);
    return this.httpClient.get<T>(url);
  }

  getClient<T>(url: string): Observable<T> {
    return new Observable(observer => {
      const controller = new AbortController();
      fetch(url, {signal: controller.signal})
        .then(response => {
          if (response.status >= 200 && response.status <= 299) {
            response.json()
              .then(json => {
                observer.next(json as T);
                observer.complete();
              })
          } else {
            observer.error('Request failed with status: ' + response.status);
          }
        })
        .catch(error => observer.error(error));
      return () => controller.abort();
    });
  }

  basics(): void {
    const stream$ = of(1, 2, 3, 4, 5);
    // without subscribe it's only a definition of a stream (lazy evaluation)

    stream$.subscribe({
      next: value => console.log('Next value: ' + value),
      error: err => console.log('Error: ' + err),
      complete: () => console.log('Stream completed')
    });
    // if an error occurs, the stream will not emit any more events (it will be terminated)
    // a terminated stream will never emit events again

    const interval$ = interval(1_000);

    /*interval$.subscribe({
      next: value => console.log('Interval-0: ' + value)
    });*/

    const intervalSubscription = interval$.subscribe({
      next: value => console.log('Interval-1: ' + value),
      complete: () => console.log('Interval-1 completed')
    });

    setTimeout(() => intervalSubscription.unsubscribe(), 3_000);

    /*timer(3_000, 1_000).subscribe({
      next: value => console.log('Interval with delay: ' + value)
    });*/

    fromEvent(document, 'click')
      .subscribe({
        next: value => console.log('Click')
      });
  }

}
