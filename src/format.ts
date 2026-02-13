import type { HebrewDate } from "./converter.js";
import { isLeapYear } from "./converter.js";

const HEBREW_MONTHS = [
  "",
  "ניסן",
  "אייר",
  "סיוון",
  "תמוז",
  "אב",
  "אלול",
  "תשרי",
  "חשוון",
  "כסלו",
  "טבת",
  "שבט",
  "אדר",
  "אדר ב׳",
];

const HEBREW_MONTHS_EN = [
  "",
  "Nisan",
  "Iyyar",
  "Sivan",
  "Tammuz",
  "Av",
  "Elul",
  "Tishrei",
  "Cheshvan",
  "Kislev",
  "Tevet",
  "Shevat",
  "Adar",
  "Adar II",
];

const GEMATRIA_ONES = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
const GEMATRIA_TENS = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];

function numberToGematria(num: number): string {
  if (num === 15) return "ט״ו";
  if (num === 16) return "ט״ז";

  const tens = Math.floor(num / 10);
  const ones = num % 10;

  const result = (GEMATRIA_TENS[tens] ?? "") + (GEMATRIA_ONES[ones] ?? "");
  if (result.length === 1) return result + "׳";
  return result.slice(0, -1) + "״" + result.slice(-1);
}

function yearToGematria(year: number): string {
  const y = year % 1000;
  const hundreds = Math.floor(y / 100);
  const remainder = y % 100;

  const hundredLetters = [
    "",
    "ק",
    "ר",
    "ש",
    "ת",
    "תק",
    "תר",
    "תש",
    "תת",
    "תתק",
  ];
  const prefix = hundredLetters[hundreds] ?? "";

  if (remainder === 0) return prefix + "׳";

  const tens = Math.floor(remainder / 10);
  const ones = remainder % 10;

  if (remainder === 15) return prefix + "ט״ו";
  if (remainder === 16) return prefix + "ט״ז";

  const tensStr = GEMATRIA_TENS[tens] ?? "";
  const onesStr = GEMATRIA_ONES[ones] ?? "";
  const result = prefix + tensStr + onesStr;

  if (result.length === 1) return result + "׳";
  return result.slice(0, -1) + "״" + result.slice(-1);
}

export function getMonthName(month: number, leap: boolean): string {
  if (month === 12 && leap) return "אדר א׳";
  return HEBREW_MONTHS[month] ?? "";
}

export function getMonthNameEn(month: number, leap: boolean): string {
  if (month === 12 && leap) return "Adar I";
  return HEBREW_MONTHS_EN[month] ?? "";
}

export function formatHebrew(hDate: HebrewDate): string {
  const day = numberToGematria(hDate.day);
  const month = getMonthName(hDate.month, isLeapYear(hDate.year));
  const year = yearToGematria(hDate.year);
  return `${day} ${month} ${year}`;
}

export function formatHebrewEn(hDate: HebrewDate): string {
  const month = getMonthNameEn(hDate.month, isLeapYear(hDate.year));
  return `${hDate.day} ${month} ${hDate.year}`;
}
