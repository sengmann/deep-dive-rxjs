/**
 * .----. .----..----..----.    .----. .-..-. .-..----.   .----. .-.  .-.   .-. .----.
 * | {}  \| {_  | {_  | {}  }   | {}  \| || | | || {_     | {}  } \ \/ / .-.| |{ {__
 * |     /| {__ | {__ | .--'    |     /| |\ \_/ /| {__    | .-. \ / /\ \ | {} |.-._} }
 * `----' `----'`----'`-'       `----' `-' `---' `----'   `-' `-'`-'  `-'`----'`----'
 */

/**
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









// Hello from the observable world...
import { of } from 'rxjs';

of(1, 2, 3).subscribe(n => console.log(n));























