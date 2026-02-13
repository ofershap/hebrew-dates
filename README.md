# hebrew-dates

[![npm version](https://img.shields.io/npm/v/hebrew-dates.svg)](https://www.npmjs.com/package/hebrew-dates)
[![npm downloads](https://img.shields.io/npm/dm/hebrew-dates.svg)](https://www.npmjs.com/package/hebrew-dates)
[![CI](https://github.com/ofershap/hebrew-dates/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/hebrew-dates/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://github.com/ofershap/hebrew-dates)

Convert dates, look up holidays, and format in Hebrew — all typed, all tree-shakeable, no heavy calendar dependencies.

```ts
import { toHebrew, formatHebrew, getHoliday } from "hebrew-dates";

const hDate = toHebrew(new Date(2024, 9, 3));
formatHebrew(hDate); // "א׳ תשרי תשפ״ה"
getHoliday(hDate); // { name: "Rosh Hashana", nameHe: "ראש השנה" }
```

> Modern Hebrew/Jewish calendar library for TypeScript. Zero dependencies.

![Demo](assets/demo.gif)

## Install

```bash
npm install hebrew-dates
```

## Usage

```typescript
import {
  toHebrew,
  toGregorian,
  formatHebrew,
  formatHebrewEn,
  getHoliday,
  getHolidaysInMonth,
} from "hebrew-dates";

const hDate = toHebrew(new Date(2024, 9, 3));
// { year: 5785, month: 7, day: 1 }

formatHebrew(hDate);
// "א׳ תשרי תשפ״ה"

formatHebrewEn(hDate);
// "1 Tishrei 5785"

const holiday = getHoliday(hDate);
// { name: "Rosh Hashana", nameHe: "ראש השנה", type: "major" }

const gregDate = toGregorian({ year: 5785, month: 7, day: 10 });
// Date object for Yom Kippur 5785

const tishrei = getHolidaysInMonth(5785, 7);
// All holidays in Tishrei 5785
```

## API

### Date Conversion

| Function               | Description                      |
| ---------------------- | -------------------------------- |
| `toHebrew(date: Date)` | Convert Gregorian to Hebrew date |
| `toGregorian(hDate)`   | Convert Hebrew to Gregorian date |

### Formatting

| Function                      | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| `formatHebrew(hDate)`         | Format as Hebrew string (e.g. "א׳ תשרי תשפ״ה")   |
| `formatHebrewEn(hDate)`       | Format as English string (e.g. "1 Tishrei 5785") |
| `getMonthName(month, leap)`   | Hebrew month name                                |
| `getMonthNameEn(month, leap)` | English month name                               |

### Holidays

| Function                          | Description                      |
| --------------------------------- | -------------------------------- |
| `getHoliday(hDate)`               | Get holiday for a date (or null) |
| `getHolidaysInMonth(year, month)` | All holidays in a month          |

Holiday types: `major`, `minor`, `modern`, `fast`

### Calendar Utilities

| Function                   | Description                         |
| -------------------------- | ----------------------------------- |
| `isLeapYear(year)`         | Check if Hebrew year is a leap year |
| `monthsInYear(year)`       | Number of months (12 or 13)         |
| `daysInMonth(year, month)` | Days in a Hebrew month              |
| `hebrewYearDays(year)`     | Total days in a Hebrew year         |

### Supported Holidays

**Major:** Rosh Hashana, Yom Kippur, Sukkot, Shmini Atzeret, Simchat Torah, Pesach, Shavuot

**Minor:** Chanukah, Purim, Shushan Purim, Tu BiShvat, Lag BaOmer, Tu B'Av, Chol HaMoed

**Fast Days:** Tzom Gedaliah, Asara B'Tevet, Ta'anit Esther, Shiva Asar B'Tammuz, Tisha B'Av

**Modern:** Yom HaShoah, Yom HaZikaron, Yom HaAtzmaut, Yom Yerushalayim

## Hebrew Month Numbers

| #   | Month                       | Hebrew |
| --- | --------------------------- | ------ |
| 1   | Nisan                       | ניסן   |
| 2   | Iyyar                       | אייר   |
| 3   | Sivan                       | סיוון  |
| 4   | Tammuz                      | תמוז   |
| 5   | Av                          | אב     |
| 6   | Elul                        | אלול   |
| 7   | Tishrei                     | תשרי   |
| 8   | Cheshvan                    | חשוון  |
| 9   | Kislev                      | כסלו   |
| 10  | Tevet                       | טבת    |
| 11  | Shevat                      | שבט    |
| 12  | Adar (Adar I in leap years) | אדר    |
| 13  | Adar II (leap years only)   | אדר ב׳ |

## License

[MIT](LICENSE) &copy; [Ofer Shapira](https://github.com/ofershap)
