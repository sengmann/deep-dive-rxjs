/*
 *  .---. .----. .----..---. .-..-. .-. .---.
 * {_   _}| {_  { {__ {_   _}| ||  `| |/   __}
 *   | |  | {__ .-._} } | |  | || |\  |\  {_ }
 *   `-'  `----'`----'  `-'  `-'`-' `-' `---'
 */



import { merge, Observable, of, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { marbles } from "rxjs-marbles/jest";

describe("Testing observables", () => {
    it("and check if last value is number 3", async () => {
        const foo$ = of(1, 2, 3);
        // check if last value is the number 3
        await foo$.toPromise().then(n => expect(n).toBe(3));
    });

    it("and check if every element is the char a", async () => {
        const testee$ = of("a", "a", "a");
        await testee$.forEach(char => expect(char).toBe("a"));
    });

    it("and use a subject to control value emitting in test", () => {
        // unit under test
        class StringTransformer {
            lastNumber: number = -1;

            constructor(readonly input$: Observable<string>) {
                this.input$.pipe(
                    map(s => parseInt(s, 10)),
                ).subscribe(n => this.lastNumber = n);
            }
        }

        const input$ = new Subject<string>();
        const testee = new StringTransformer(input$);

        expect(testee.lastNumber).toBe(-1);
        input$.next("12");
        expect(testee.lastNumber).toBe(12);
        input$.next("abc");
        expect(testee.lastNumber).toBe(NaN);

        // tear down
        input$.complete();
    });



    // -------------------------------------------------------------------------------------------------------------------

// How to describe when and what is happening?

// We are using so called marble diagrams to describe the time sequence.

    /**
     * empty() => '|'
     * of(1) => '1|'
     * timer(10, 3) => '-0-1-2|'
     * throwError(e) => '#'
     */



    // wrap test function with marbles helper
    it("with marble diagrams", marbles(marbleContext => {
        const empty = marbleContext.cold("|");
        marbleContext.expect(empty).toBeObservable("|");
    }));

    it("with marble diagrams and merging two observables", marbles((m) => {
        const a$ = m.cold("-a|");
        const b$ = m.cold("1|");

        const o$ = m.cold("1a|");

        const result = merge(a$, b$);
        m.expect(result).toBeObservable(o$);
    }));

    it("with filter, map and marble diagram", marbles((m) => {
        const in1Marble = "-a-b-c|"; // strings
        const in2Marble = "-d-e-f|"; // mapped to number
        const in3Marble = "---e--|"; // filter even numbers
        const outMarble = "---g--|"; // multiply by 10

        const in1Values = { a: "2", b: "3", c: "4" };
        const in2Values = { d: 2, e: 3, f: 4 };
        const in3Values = { e: 3 };
        const outValues = { g: 30 };

        const in1 = m.cold(in1Marble, in1Values);
        const in2 = m.cold(in2Marble, in2Values);
        const in3 = m.cold(in3Marble, in3Values);
        const out = m.cold(outMarble, outValues);

        function mapToNumber() {
            return (input: Observable<string>) => input.pipe(
                map(s => parseInt(s, 10))
            );
        }

        function filterEven() {
            return (input: Observable<number>) => input.pipe(filter(n => n % 2 !== 0));
        }

        function multiplyByTen() {
            return (input: Observable<number>) => input.pipe(map(n => n * 10));
        }

        const result1 = in1.pipe(mapToNumber());
        m.expect(result1).toBeObservable(in2);

        const result2 = in2.pipe(filterEven());
        m.expect(result2).toBeObservable(in3);

        const result3 = in3.pipe(multiplyByTen());
        m.expect(result3).toBeObservable(out);

        const allInOnePipeResult = in1.pipe(
            mapToNumber(),
            filterEven(),
            multiplyByTen()
        );

        m.expect(allInOnePipeResult).toBeObservable(out);
    }));
});

