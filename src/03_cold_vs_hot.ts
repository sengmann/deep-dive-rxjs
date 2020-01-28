/*
 *  .---.  .----. .-.   .----.    .-. .-. .----.   .-. .-. .----.  .---.
 * /  ___}/  {}  \| |   | {}  \   | | | |{ {__     | {_} |/  {}  \{_   _}
 * \     }\      /| `--.|     /   \ \_/ /.-._} }   | { } |\      /  | |
 *  `---'  `----' `----'`----'     `---' `----'    `-' `-' `----'   `-'
 *   .----. .----.  .----..----..----. .-. .-.  .--.  .----. .-.   .----.
 *  /  {}  \| {}  }{ {__  | {_  | {}  }| | | | / {} \ | {}  }| |   | {_
 *  \      /| {}  }.-._} }| {__ | .-. \\ \_/ //  /\  \| {}  }| `--.| {__
 *   `----' `----' `----' `----'`-' `-' `---' `-'  `-'`----' `----'`----'
 */



// Cold Observable provide a separate data source for each subscriber.

import { interval } from "rxjs";
import { share, shareReplay, take, timestamp } from "rxjs/operators";

const i = interval(500).pipe(take(4));

// each subscribe starts own interval and begin counting with 0
i.subscribe(_ => console.log(`a: ${_}`));
setTimeout(() => i.subscribe(_ => console.log(`b: ${_}`)), 1000);









// Hot Observables always provide data, even when there is no subscriber. No data is stored by the Observable

const j = interval(500).pipe(
    timestamp(),
    take(2),
    share()
);

j.subscribe(_ => console.log(_));
// The first event is lost for the second subscriber.
setTimeout(() => j.subscribe((_) => console.log(_)), 800);








// It is also possible to create observables between hot and cold.

const k = interval(500).pipe(
    timestamp(),
    take(2),
    shareReplay(1),
);

k.subscribe(_ => console.log(_));
// The last n events are repeated for the new receiver, even if the source has already sent the completed signal.
setTimeout(() => k.subscribe(_ => console.log(_)), 1500);

