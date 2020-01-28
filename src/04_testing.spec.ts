/*
 *  .---. .----. .----..---. .-..-. .-. .---.
 * {_   _}| {_  { {__ {_   _}| ||  `| |/   __}
 *   | |  | {__ .-._} } | |  | || |\  |\  {_ }
 *   `-'  `----'`----'  `-'  `-'`-' `-' `---'
 */



import { of } from "rxjs";

describe("Testing observables", () => {
    it("the manual way starting easy", async () => {
        const foo$ = of(1, 2, 3);
        // check if last value is the number 3
        await foo$.toPromise().then(n => expect(n).toBe(3));
    });

    it("test with forEach", () => {

    });

    it("test with subject", () => {

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




    it("test with marbles", () => {

    });
});

