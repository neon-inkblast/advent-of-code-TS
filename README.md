# AdventOfCode-TS

Project template for Advent of Code challenges

### Get started

To get started, run the `npm run generate` command followed by a year argument
eg. `npm run generate 2022`

after that, modify the file found at `./src/index.ts` to run any year, day, or part

for example, after running `npm run generate 2022`
change the index file to something like...

---

```js
import { run2022 } from "./2022";

run2022();
```

or

```js
import { day_04 } from "./2022/day_04/day_04";

day04();
```

or

```js
import { part1 } from "./2022/day_02/part_1";
// day 2 part 1
part1();
```

---

### Testing

you can also start tests using `npm test`. Might be a nice way to TDD code...
