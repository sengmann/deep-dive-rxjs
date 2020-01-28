/*
 *  .----. .----. .----..----.   .--.  .---.  .----. .----.  .----.
 * /  {}  \| {}  }| {_  | {}  } / {} \{_   _}/  {}  \| {}  }{ {__
 * \      /| .--' | {__ | .-. \/  /\  \ | |  \      /| .-. \.-._} }
 *  `----' `-'    `----'`-' `-'`-'  `-' `-'   `----' `-' `-'`----'
 */


// Operators are used as pipe since version 6







// Starting simple

import { combineLatest, concat, empty, interval, Observable, of, throwError, zip } from "rxjs";
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
import { combineLatestToMap } from "@w11k/rx-ninja";

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







const a = interval(1000).pipe(take(3));
const b = interval(2000).pipe(take(2));

zip(a, b)
    .subscribe(_ => console.log(_));

combineLatest([a, b])
    .subscribe(_ => console.log(_));




/* https://rxviz.com/examples/custom
const { merge, interval } = Rx;
const { map } = RxOperators;
merge(
    interval(1000).pipe(map((_) => "a " + _)),
    interval(1600).pipe(map((_) => "b " + _))
);
*/


/* https://rxviz.com/examples/custom
const { fromEvent, of, interval } = Rx;
const { mergeMap, map, switchMap, delay } = RxOperators;

// faking network request for save
const save = (x) => {
  return of(x).pipe(delay(500))
  //return interval(500).pipe(map(() => x));
};

const click$ = fromEvent(document, 'click');

click$
  .pipe( mergeMap(e => save(e.clientX)) )
*/








// Can't find the operator to solve your problem? Don't mind and write your own
// A pipeable operator is a function that is passed an observable and must return a result observable.

const canContainNull: Observable<string | null> = of("a", "ab", "ccc", null, "d");

function isNotNull<T>(t: T | null): t is T {
    return t !== null;
}


const lengthOfStrings = canContainNull.pipe(
    filter(isNotNull), // works but not exactly easy to use
    map(x => x.length)
);

lengthOfStrings.subscribe(_ => console.log(_));

function skipNull<T>() {
    return (input: Observable<T | null>) => input.pipe(filter(isNotNull));
}

canContainNull.pipe(skipNull()).subscribe(_ => console.log(_));





const foo$ = of(1, 2, 3, 4);
const bar$ = of("5", "3", "4");

// What happens when we switch foo$ and bar$?
combineLatest([foo$, bar$])
    .pipe(
        map(([f, b]) => f + parseInt(b, 10)),
    ).subscribe(_ => console.log(_));



// Looks very similar, but we can access the values using the property name instead of the position in the array
combineLatestToMap({ f: foo$, b: bar$ })
    .pipe(
        map(({ f, b }) => f + parseInt(b, 10)),
    ).subscribe(_ => console.log(_));

















