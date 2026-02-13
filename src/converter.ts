export interface HebrewDate {
  year: number;
  month: number;
  day: number;
}

export function isLeapYear(year: number): boolean {
  return (7 * year + 1) % 19 < 7;
}

export function monthsInYear(year: number): number {
  return isLeapYear(year) ? 13 : 12;
}

export function daysInMonth(year: number, month: number): number {
  if (
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 10 ||
    month === 13
  ) {
    return 29;
  }
  if (month === 12) {
    return isLeapYear(year) ? 30 : 29;
  }
  if (month === 8) {
    return longCheshvan(year) ? 30 : 29;
  }
  if (month === 9) {
    return shortKislev(year) ? 29 : 30;
  }
  return 30;
}

function hebrewCalendarElapsedDays(year: number): number {
  const monthsElapsed = Math.floor((235 * year - 234) / 19);
  const partsElapsed = 12084 + 13753 * monthsElapsed;
  let day = monthsElapsed * 29 + Math.floor(partsElapsed / 25920);
  if ((3 * (day + 1)) % 7 < 3) {
    day += 1;
  }
  return day;
}

function hebrewNewYearDelay(year: number): number {
  const ny0 = hebrewCalendarElapsedDays(year - 1);
  const ny1 = hebrewCalendarElapsedDays(year);
  const ny2 = hebrewCalendarElapsedDays(year + 1);
  if (ny2 - ny1 === 356) return 2;
  if (ny1 - ny0 === 382) return 1;
  return 0;
}

function hebrewNewYear(year: number): number {
  return hebrewCalendarElapsedDays(year) + hebrewNewYearDelay(year);
}

export function hebrewYearDays(year: number): number {
  return hebrewNewYear(year + 1) - hebrewNewYear(year);
}

function longCheshvan(year: number): boolean {
  return hebrewYearDays(year) % 10 === 5;
}

function shortKislev(year: number): boolean {
  return hebrewYearDays(year) % 10 === 3;
}

const HEBREW_EPOCH = -1373427;

function hebrewToFixed(hDate: HebrewDate): number {
  let days = HEBREW_EPOCH + hebrewNewYear(hDate.year) + hDate.day - 1;

  if (hDate.month < 7) {
    for (let m = 7; m <= monthsInYear(hDate.year); m++) {
      days += daysInMonth(hDate.year, m);
    }
    for (let m = 1; m < hDate.month; m++) {
      days += daysInMonth(hDate.year, m);
    }
  } else {
    for (let m = 7; m < hDate.month; m++) {
      days += daysInMonth(hDate.year, m);
    }
  }

  return days;
}

function fixedToHebrew(fixedDate: number): HebrewDate {
  const approx = Math.floor((fixedDate - HEBREW_EPOCH) / 365.25);
  let year = approx - 1;
  while (hebrewToFixed({ year: year + 1, month: 7, day: 1 }) <= fixedDate) {
    year++;
  }

  let month: number;
  if (fixedDate < hebrewToFixed({ year, month: 1, day: 1 })) {
    month = 7;
  } else {
    month = 1;
  }

  while (
    fixedDate > hebrewToFixed({ year, month, day: daysInMonth(year, month) })
  ) {
    month++;
  }

  const day = fixedDate - hebrewToFixed({ year, month, day: 1 }) + 1;
  return { year, month, day };
}

function gregorianToFixed(year: number, month: number, day: number): number {
  const y = year - 1;
  return (
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) +
    Math.floor((367 * month - 362) / 12) +
    (month <= 2 ? 0 : isGregorianLeapYear(year) ? -1 : -2) +
    day
  );
}

function fixedToGregorian(fixedDate: number): {
  year: number;
  month: number;
  day: number;
} {
  const d0 = fixedDate - 1;
  const n400 = Math.floor(d0 / 146097);
  const d1 = d0 % 146097;
  const n100 = Math.floor(d1 / 36524);
  const d2 = d1 % 36524;
  const n4 = Math.floor(d2 / 1461);
  const d3 = d2 % 1461;
  const n1 = Math.floor(d3 / 365);

  const year =
    400 * n400 + 100 * n100 + 4 * n4 + n1 + (n100 === 4 || n1 === 4 ? 0 : 1);

  const priorDays = fixedDate - gregorianToFixed(year, 1, 1);
  const correction =
    fixedDate < gregorianToFixed(year, 3, 1)
      ? 0
      : isGregorianLeapYear(year)
        ? 1
        : 2;
  const month = Math.floor((12 * (priorDays + correction) + 373) / 367);
  const day = fixedDate - gregorianToFixed(year, month, 1) + 1;

  return { year, month, day };
}

function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function toHebrew(date: Date): HebrewDate {
  const fixed = gregorianToFixed(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  return fixedToHebrew(fixed);
}

export function toGregorian(hDate: HebrewDate): Date {
  const fixed = hebrewToFixed(hDate);
  const greg = fixedToGregorian(fixed);
  return new Date(greg.year, greg.month - 1, greg.day);
}
