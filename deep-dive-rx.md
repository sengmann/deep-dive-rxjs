# Deep Dive RxJS

## Agenda
 * Was ist RxJS
 * Kurze Grundlagen
   * of, from, fromEvent
   * Marbles
   * Wechsel zwischen Promise und Observable
 * Operatoren
   * einfache Operatotren wie filter, map, tap, catchError
   * Higher Order Operators (combineLatest, zip, race)
   * eigene Operatoren (skipNull, combineLatestToMap)
 * Cold vs. hot Observable
 * Testen
   * Observeables / Subjects in Tests
   * Testen mit Marbles
 *  Speicherleckes
   * Warum?
   * Wie klempnern
 * Kür
   * eigene Linter Regeln