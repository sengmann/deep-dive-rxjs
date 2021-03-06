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
import { empty, from, fromEvent, interval, Observable, of, range, Subject, timer } from "rxjs";
import { take } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";







// Creating Observables
empty();

of(1, 2, 3).subscribe(n => console.log(n));


from([1, 2, 3]).subscribe(counter => console.log(counter));


range(1, 5)
    .subscribe(i => console.log(i));


timer(100).subscribe(_ => console.log(_));











// But why all of them have to end?

const EventEmitter = require("events").EventEmitter;
const clickEventEmitter = new EventEmitter();

fromEvent(clickEventEmitter, "buttonClick")
    .pipe(take(1))
    .subscribe(mouseEvent => console.log(mouseEvent));
clickEventEmitter.emit("buttonClick", { type: "MouseEvent", x: 100, y: 100 });



// RxViz https://rxviz.com/
interval(200)
    .pipe(take(5))
    .subscribe(counter => console.log(counter));










const subject = new Subject();
subject.subscribe(n => console.log(n));
subject.next(1);
subject.next(2);
subject.complete();










// And what about Promises?

fromPromise(Promise.resolve("abc"))
    .subscribe(text => console.log(text));

of(1).toPromise()
    .then(n => console.log(n));










// Care must be taken to clean up the subscription

const subject2 = new Subject<number>();

class Foo {
    lastNumber: number = -1;

    constructor(private input$: Observable<number>) {
        this.input$.subscribe(n => this.lastNumber = n);
    }
}

let foo = new Foo(subject2); // create instance #1
subject2.next(1);
console.log(foo.lastNumber);
foo = new Foo(subject2); // <- This leads to a memory leak where the memory of instance #1 cannot be released
                         //    until subject2 sends the completed signal or ends with an error.




























