/*
 *  .----. .----. .----..----.   .--.  .---.  .----. .----.  .----.
 * /  {}  \| {}  }| {_  | {}  } / {} \{_   _}/  {}  \| {}  }{ {__
 * \      /| .--' | {__ | .-. \/  /\  \ | |  \      /| .-. \.-._} }
 *  `----' `-'    `----'`-' `-'`-'  `-' `-'   `----' `-' `-'`----'
 */









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
        map(value => parseInt(value, 10)),
    ).subscribe(mappedValue => console.log(mappedValue));

of(1, 2, 3, 4, 5)
    .pipe(
        filter(n => n % 2 !== 0),
    ).subscribe(oddNumber => console.log(oddNumber));

of("1", "2", "3")
    .pipe(
        map(value => parseInt(value, 10)),
        filter(n => n % 2 !== 0),
    ).subscribe(oddNumber => console.log(oddNumber));










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
    ).subscribe(pair => console.log(pair));


// Only when value really changes
of(1, 2, 2, 3, 4)
    .pipe(
        startWith(undefined),
        pairwise(),
        filter(([n1, n2]) => n1 === undefined || n1 !== n2),
        map(([, n2]) => n2)
    ).subscribe(n => console.log(n));










// Or like this...
of(1, 2, 2, 3, 4)
    .pipe(
        distinctUntilChanged()
    ).subscribe(n => console.log(n));










of(1, 2, 3, 4)
    .pipe(
        take(2)
    ).subscribe(n => console.log(n));


of(1, 2, 3)
    .pipe(
        first()
    ).subscribe(n => console.log(n));


empty().pipe(
    take(1), // okay
    //first(), // will throw error
).subscribe(never => console.log(never));


of(1, 2, 3, 4, 5).pipe(
    reduce((acc, val) => acc + val)
).subscribe(sum => console.log(sum));


of(1, 2, 3, -1)
    .pipe(
        tap(n => {
            if (n < 0) {
                throw "number must be greater than 0";
            }
        }),
    ).subscribe(
    n => console.log(`got positive number ${n}`),
    error => console.log(`oh no ${error}`),
    () => console.log(`completed`) // not executed when error is thrown
);


throwError("bad things happen")
    .pipe(
        catchError(_ => of(1)) // recover
    ).subscribe(recoverValue => console.log(recoverValue));










// combining
concat(
    of(1, 2, 3),
    of(4, 5, 6)
).subscribe(n => console.log(n));







const a = interval(1000).pipe(take(3));
const b = interval(2000).pipe(take(2));






zip(a, b)
    .subscribe(zipped => console.log(zipped));





combineLatest([a, b])
    .subscribe(combined => console.log(combined));




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
  return of(x).pipe(delay(1500))
  //return interval(1500).pipe(map(() => x));
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


canContainNull.pipe(
    filter(isNotNull),
    map(x => x.length)
).subscribe(_ => console.log(_));







function skipNull<T>() {
    return (input: Observable<T | null>) => input.pipe(filter(isNotNull));
}

canContainNull
    .pipe(
        skipNull()
    ).subscribe(_ => console.log(_));










const oddNumbers = of(1, 3, 5);
const evenNumbers = of(2, 4, 6);
const randomNumber = of(6, 4, 2);


combineLatest([oddNumbers, evenNumbers, randomNumber])
    .pipe(
        // What happens when we switch oddNumbers and evenNumbers?
        map(([oddNumbers, evenNumbers, randomNumber]) => oddNumbers - evenNumbers + (randomNumber * 10)),
    ).subscribe(_ => console.log(_));



// Looks very similar, but we can access the values using the property name instead of the position in the array
combineLatestToMap({ oddNumbers, evenNumbers, randomNumber })
    .pipe(
        map(({ oddNumbers, evenNumbers, randomNumber }) => oddNumbers - evenNumbers + (randomNumber * 10)),
    ).subscribe(_ => console.log(_));

















