import {Observable, tap} from "rxjs";

export enum LoggingLevel {
  TRACE, DEBUG, INFO, ERROR
}

let loggingLevel = LoggingLevel.INFO;

export function setLoggingLevel(level: LoggingLevel) {
  loggingLevel = level;
}

export const debug = (level: LoggingLevel, message: string) => (source: Observable<any>) => source
  .pipe(
    tap(value => {
      if (level >= loggingLevel) {
        console.log(message + ':', value);
      }
    })
  )
