/**
 * .----. .----. .----..----.   .--.  .---.  .----. .----.  .----.
 * /  {}  \| {}  }| {_  | {}  } / {} \{_   _}/  {}  \| {}  }{ {__
 * \      /| .--' | {__ | .-. \/  /\  \ | |  \      /| .-. \.-._} }
 * `----' `-'    `----'`-' `-'`-'  `-' `-'   `----' `-' `-'`----'
 */


// Operators are used as pipe since version 6







// Starting simple

import { concat, empty, of, throwError } from "rxjs";
import {
    catchError,
    distinctUntilChanged,
    filter,
    first,
    map,
    pairwise,
    reduce,
    startWith,
    take,
    tap
} from "rxjs/operators";

of("1", "2", "3")
    .pipe(
        map(_ => parseInt(_, 10)),
    ).subscribe(_ => console.log(_));

of(1, 2, 3, 4, 5)
    .pipe(
        filter(n => n % 2 !== 0),
    ).subscribe(_ => console.log(_));

of("1", "2", "3")
    .pipe(
        map(_ => parseInt(_, 10)),
        filter(n => n % 2 !== 0),
    ).subscribe(_ => console.log(_));

// RxViz https://rxviz.com/examples/custom
/*
const { interval } = Rx;
const { skip } = RxOperators;

interval(500)
    .pipe(
        skip(2),
    );
*/


of(1, 2, 3, 4)
    .pipe(
        pairwise(),
    ).subscribe(_ => console.log(_));

// Only when value really changes
of(1, 2, 2, 3, 4)
    .pipe(
        startWith(undefined),
        pairwise(),
        filter(([prev, curr]) => prev === undefined || prev !== curr),
        map(([_, curr]) => curr)
    ).subscribe(_ => console.log(_));

// Or like this...
of(1, 2, 2, 3, 4)
    .pipe(
        distinctUntilChanged()
    ).subscribe(_ => console.log(_));





of(1, 2, 3, 4)
    .pipe(
        take(2)
    ).subscribe(_ => console.log(_));

of(1, 2, 3)
    .pipe(
        first()
    ).subscribe(_ => console.log(_));

empty().pipe(
    take(1), // okay
    //first(), // will throw error
).subscribe(_ => console.log(_));


of(1, 2, 3, 4, 5).pipe(
    reduce((acc, val) => acc + val)
).subscribe(_ => console.log(_));


of(1, 2, 3, -1)
    .pipe(
        tap(n => {
            if (n < 0) {
                throw "number must be greater than 0";
            }
        }),
    ).subscribe(
    _ => console.log(`got positive number ${_}`),
    error => console.log(`oh no ${error}`),
    () => console.log(`completed`) // not executed when error is thrown
);

throwError("bad things happen")
    .pipe(
        catchError(_ => of(1)) // recover
    ).subscribe(_ => console.log(_));



// combining
concat(of(1, 2, 3), of(4, 5, 6))
    .subscribe(_ => console.log(_));


/* https://rxviz.com/examples/custom
const { merge, interval } = Rx;
const { map } = RxOperators;
merge(
    interval(1000).pipe(map((_) => "a " + _)),
    interval(1600).pipe(map((_) => "b " + _))
);
*/
























