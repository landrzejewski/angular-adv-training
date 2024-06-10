import {AfterViewInit, Component} from '@angular/core';
import {interval, of} from "rxjs";

@Component({
  selector: 'app-rx-examples',
  standalone: true,
  imports: [],
  templateUrl: './rx-examples.component.html',
  styleUrl: './rx-examples.component.css'
})
export class RxExamplesComponent implements AfterViewInit{

    ngAfterViewInit(): void {
      // of - Converts the arguments to an observable sequence
      // interval - Creates an Observable that emits sequential numbers every specified interval of time, on a specified SchedulerLike

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

      interval$.subscribe({
        next: value => console.log('Interval-0: ' + value)
      });

      const intervalSubscription = interval$.subscribe({
        next: value => console.log('Interval-1: ' + value),
        complete: () => console.log('Interval completed')
      });

      setTimeout(() => intervalSubscription.unsubscribe(), 3_000);

    }

}
