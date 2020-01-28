/*
 * .----. .----..----..----.    .----. .-..-. .-..----.   .----. .-.  .-.   .-. .----.
 * | {}  \| {_  | {_  | {}  }   | {}  \| || | | || {_     | {}  } \ \/ / .-.| |{ {__
 * |     /| {__ | {__ | .--'    |     /| |\ \_/ /| {__    | .-. \ / /\ \ | {} |.-._} }
 * `----' `----'`----'`-'       `----' `-' `---' `----'   `-' `-'`-'  `-'`----'`----'
 */

/*
 * MMMMMMMMMMMMWWNNWWMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMWNOdoodx0KKKXNWWMMMMMMMMMMMMMM
 * MMMMMMWNXKkl;,,,,,;;::clodkKNWMMMMMMMMMM
 * MMMMWKdlc;,,,,,;,,,,,;;;;;;:lx0NWMMMMMMM
 * MMMWNx;;,'',;;;;;;;;;;;;cl:;;;:o0NWMMMMM
 * MWWN0l,'''',,,,,,,,;;;;;cl:;;;;;:xXWWMMM
 * MWKxc,''',,,,,,,;coolc;;;;;;;;;;;:kO0WMM
 * MWx;,',,,,,,,;lkKNWWNX0kxolc::::cdKxoXMM
 * MW0c',;;,;,,cONMMMMMMMMMMWNXXKKKXWNocKWW
 * MWKc';;;;;,cOWWMMMMMMMMMMMMMMMMMMWO:okkN
 * WNx;,;;;;;;oNWMMMMMMMMMMMMMMMMMMW0::l;dW
 * WWKo;;;;;;;dNMMMMMMMMMMMMMMMMMMNk;','cKM
 * MMWNx:;;;;;l0WMMMMMMMMMMMMWMWNOl:;,'c0WM
 * MMMWXx:;;;;;oKNKKWMMMMWMMMWMWXkdl::dk0NW
 * MMMMWNkc;;;;;cxkdd0XNWWWWX0Oxoc;,:lclOWM
 * MMMMMMWKdc;;;;;cl::lodk0KOdl:,,,,,;oKWMM
 * MMMMMMMWNKxl:;;;;;;;;;;;:cllc;,,:d0NWMMM
 * MMMMMMMMMWWN0xol::;;;;;;;;;;:ldkKWWWWMMM
 * MMMMMMMWWMWWWWWXK0Okkxxxxkk0KNWWMMMMMMMM
 * MMMMMMMWWMMMMMMMMWWWWWWWWWWWMMMMMMMMMMMM
 */


// Q: What is RxJS?
// A: The implementation of Reactive Extensions using Javascript / Typescript

// Q: But what is Reactive Extensions
// A: An implementation of the Observable Pattern from Microsoft (Open Source since 2012)

// Q: Are Reactive Extensions only available for Javascript / Typescript?
// A: There are also implementations for Java, C#, C++ and many more (http://reactivex.io/languages.html)

// Q: What do you need it for?
// A: RxJS is a library for composing asynchronous and event-based programs by using observable sequences.

// Q: What are the most important properties of observables?
// A: Observables are lazy and can deliver more than one value over time










// Hello from the observable world...
import { empty, from, fromEvent, interval, of, range, Subject, timer } from "rxjs";
import { take } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";

const EventEmitter = require("events").EventEmitter;
const clickEventEmitter = new EventEmitter();

of(1, 2, 3).subscribe(n => console.log(n));




// Creating Observables

from([1, 2, 3]).subscribe(_ => console.log(_));

timer(100).subscribe(_ => console.log(_));

empty();


// But why all of them have to end?

fromEvent(clickEventEmitter, "buttonClick")
    .pipe(take(1))
    .subscribe(_ => console.log(_));
clickEventEmitter.emit("buttonClick", { type: "MouseEvent", x: 100, y: 100 });

// RxViz https://rxviz.com/
interval(200)
    .pipe(take(5))
    .subscribe(_ => console.log(_));


range(1, 5)
    .subscribe(_ => console.log(_));


const subject = new Subject();
subject.subscribe(_ => console.log(_));
subject.next(1);
subject.next(2);
subject.complete();


// And what about Promises?

fromPromise(Promise.resolve("abc")).subscribe(_ => console.log(_));
of(1).toPromise().then(_ => console.log(_));




// How to describe when and what is happening?

// We are using so called marble diagrams to describe the time sequence.

/**
 * empty() => '|'
 * of(1) => '1|'
 * timer(10, 3) => '-0-1-2|'
 * throwError(e) => '#'
 */

























