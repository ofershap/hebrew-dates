import type { HebrewDate } from "./converter.js";
import { isLeapYear, daysInMonth } from "./converter.js";

export interface Holiday {
  name: string;
  nameHe: string;
  type: "major" | "minor" | "modern" | "fast";
}

export function getHoliday(hDate: HebrewDate): Holiday | null {
  const { month, day, year } = hDate;

  if (month === 7 && day === 1)
    return { name: "Rosh Hashana", nameHe: "ראש השנה", type: "major" };
  if (month === 7 && day === 2)
    return { name: "Rosh Hashana II", nameHe: "ראש השנה ב׳", type: "major" };
  if (month === 7 && day === 3)
    return { name: "Tzom Gedaliah", nameHe: "צום גדליה", type: "fast" };
  if (month === 7 && day === 10)
    return { name: "Yom Kippur", nameHe: "יום כיפור", type: "major" };
  if (month === 7 && day === 15)
    return { name: "Sukkot", nameHe: "סוכות", type: "major" };
  if (month === 7 && day >= 16 && day <= 20)
    return {
      name: "Chol HaMoed Sukkot",
      nameHe: "חול המועד סוכות",
      type: "minor",
    };
  if (month === 7 && day === 21)
    return { name: "Hoshana Rabbah", nameHe: "הושענא רבה", type: "minor" };
  if (month === 7 && day === 22)
    return { name: "Shmini Atzeret", nameHe: "שמיני עצרת", type: "major" };
  if (month === 7 && day === 23)
    return { name: "Simchat Torah", nameHe: "שמחת תורה", type: "major" };

  if (month === 9 && day === 25)
    return { name: "Chanukah", nameHe: "חנוכה", type: "minor" };
  if (month === 9 && day >= 26 && day <= daysInMonth(year, 9))
    return { name: "Chanukah", nameHe: "חנוכה", type: "minor" };
  if (month === 10 && day <= 2)
    return { name: "Chanukah", nameHe: "חנוכה", type: "minor" };
  if (month === 10 && day === 3 && daysInMonth(year, 9) === 29)
    return { name: "Chanukah", nameHe: "חנוכה", type: "minor" };

  if (month === 10 && day === 10)
    return { name: "Asara B'Tevet", nameHe: "עשרה בטבת", type: "fast" };

  if (month === 11 && day === 15)
    return { name: "Tu BiShvat", nameHe: "ט״ו בשבט", type: "minor" };

  const adarMonth = isLeapYear(year) ? 13 : 12;
  if (month === adarMonth && day === 13)
    return { name: "Ta'anit Esther", nameHe: "תענית אסתר", type: "fast" };
  if (month === adarMonth && day === 14)
    return { name: "Purim", nameHe: "פורים", type: "minor" };
  if (month === adarMonth && day === 15)
    return { name: "Shushan Purim", nameHe: "שושן פורים", type: "minor" };

  if (month === 1 && day === 15)
    return { name: "Pesach", nameHe: "פסח", type: "major" };
  if (month === 1 && day === 16)
    return { name: "Pesach II", nameHe: "פסח ב׳", type: "major" };
  if (month === 1 && day >= 17 && day <= 20)
    return {
      name: "Chol HaMoed Pesach",
      nameHe: "חול המועד פסח",
      type: "minor",
    };
  if (month === 1 && day === 21)
    return { name: "Pesach VII", nameHe: "שביעי של פסח", type: "major" };
  if (month === 1 && day === 22)
    return { name: "Pesach VIII", nameHe: "אחרון של פסח", type: "major" };

  if (month === 2 && day === 18)
    return { name: "Lag BaOmer", nameHe: "ל״ג בעומר", type: "minor" };

  if (month === 3 && day === 6)
    return { name: "Shavuot", nameHe: "שבועות", type: "major" };
  if (month === 3 && day === 7)
    return { name: "Shavuot II", nameHe: "שבועות ב׳", type: "major" };

  if (month === 4 && day === 17)
    return {
      name: "Shiva Asar B'Tammuz",
      nameHe: "שבעה עשר בתמוז",
      type: "fast",
    };
  if (month === 5 && day === 9)
    return { name: "Tisha B'Av", nameHe: "תשעה באב", type: "fast" };
  if (month === 5 && day === 15)
    return { name: "Tu B'Av", nameHe: "ט״ו באב", type: "minor" };

  if (month === 2 && day === 5)
    return { name: "Yom HaZikaron", nameHe: "יום הזיכרון", type: "modern" };
  if (month === 2 && day === 6)
    return { name: "Yom HaAtzmaut", nameHe: "יום העצמאות", type: "modern" };
  if (month === 2 && day === 28)
    return { name: "Yom Yerushalayim", nameHe: "יום ירושלים", type: "modern" };
  if (month === 1 && day === 27)
    return { name: "Yom HaShoah", nameHe: "יום השואה", type: "modern" };

  return null;
}

export function getHolidaysInMonth(
  year: number,
  month: number,
): { day: number; holiday: Holiday }[] {
  const result: { day: number; holiday: Holiday }[] = [];
  const days = daysInMonth(year, month);
  for (let d = 1; d <= days; d++) {
    const holiday = getHoliday({ year, month, day: d });
    if (holiday) {
      result.push({ day: d, holiday });
    }
  }
  return result;
}
