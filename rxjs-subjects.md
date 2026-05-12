# RxJS: Observable, Subject, BehaviorSubject, ReplaySubject

All `Subject` variants are both an `Observable` and an `Observer` — they can emit values (`.next()`) and be subscribed to. The key difference is **what late subscribers receive**.

---

## Observable

Not a subject. Cold and stateless — each subscriber gets its own independent execution. No `.next()`.

```typescript
const o = new Observable<number>(sub => sub.next(Math.random()));

o.subscribe(v => console.log(v)); // e.g. 0.42
o.subscribe(v => console.log(v)); // e.g. 0.87 — different value, separate execution
```

---

## Subject

No memory. You only receive values emitted **after** you subscribe. Past emissions are lost.

```typescript
const s = new Subject<number>();

s.next(1); // emitted before any subscriber — lost

s.subscribe(v => console.log(v)); // subscribes now

s.next(2); // logs: 2
```

**Use when:** simple event bus, no history needed.

---

## BehaviorSubject

Stores the **current value**. Late subscribers immediately receive it. Requires an initial value.

```typescript
const s = new BehaviorSubject<number>(0); // must provide initial value

s.next(1);

s.subscribe(v => console.log(v)); // logs: 1 immediately (last emitted value)

s.next(2); // logs: 2
```

You can also read the current value synchronously:

```typescript
s.getValue(); // 2
```

**Use when:** there is always a meaningful "current state" (e.g. `isLoggedIn$`, `currentUser$`).

---

## ReplaySubject(n)

Buffers the last **n** emissions. Late subscribers receive up to `n` buffered values immediately. No initial value required.

```typescript
const s = new ReplaySubject<number>(1); // buffer size 1

s.next(1);

s.subscribe(v => console.log(v)); // logs: 1 immediately (replays last)

s.next(2); // logs: 2
```

With a buffer larger than 1:

```typescript
const s = new ReplaySubject<number>(3);

s.next(1);
s.next(2);
s.next(3);

s.subscribe(v => console.log(v)); // logs: 1, 2, 3
```

**Use when:** late subscribers need recent history, or when a `BehaviorSubject` is needed but there is no sensible initial value (common in test mocks).

---

## Quick decision guide

| Scenario | Use |
|---|---|
| Pure derivation, no shared state | `Observable` |
| Event bus, no history needed | `Subject` |
| Always has a current value | `BehaviorSubject` |
| Late subscribers need recent history | `ReplaySubject(n)` |
| Test mock where `.next()` fires before subscribe | `ReplaySubject(1)` |

---

## Why test mocks use `ReplaySubject(1)` instead of `Subject`

With a plain `Subject`, emitting before `firstValueFrom` subscribes causes a **timeout** — the value is gone before anyone is listening:

```typescript
// BROKEN — timeout
const s = new Subject<boolean>();
s.next(true);                        // emitted, nobody subscribed yet
await firstValueFrom(s);            // subscribes now, waits forever
```

With `ReplaySubject(1)`, the last value is replayed to the subscriber immediately:

```typescript
// WORKS
const s = new ReplaySubject<boolean>(1);
s.next(true);                        // buffered
await firstValueFrom(s);            // subscribes, receives buffered true immediately
```
