import { describe, it, expect } from "vitest";
import {
  toHebrew,
  toGregorian,
  isLeapYear,
  monthsInYear,
  daysInMonth,
  hebrewYearDays,
} from "../src/index.js";

describe("converter", () => {
  describe("toHebrew", () => {
    it("converts Rosh Hashana 5785 (Oct 3, 2024)", () => {
      const hDate = toHebrew(new Date(2024, 9, 3));
      expect(hDate).toEqual({ year: 5785, month: 7, day: 1 });
    });

    it("converts Jan 1, 2026", () => {
      const hDate = toHebrew(new Date(2026, 0, 1));
      expect(hDate.year).toBe(5786);
      expect(hDate.month).toBe(10);
    });

    it("converts Pesach 5784 (Apr 23, 2024)", () => {
      const hDate = toHebrew(new Date(2024, 3, 23));
      expect(hDate).toEqual({ year: 5784, month: 1, day: 15 });
    });
  });

  describe("toGregorian", () => {
    it("converts 1 Tishrei 5785 to Oct 3, 2024", () => {
      const date = toGregorian({ year: 5785, month: 7, day: 1 });
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(9);
      expect(date.getDate()).toBe(3);
    });

    it("converts 15 Nisan 5784 to Apr 23, 2024", () => {
      const date = toGregorian({ year: 5784, month: 1, day: 15 });
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(3);
      expect(date.getDate()).toBe(23);
    });

    it("roundtrips", () => {
      const original = new Date(2026, 1, 13);
      const hDate = toHebrew(original);
      const back = toGregorian(hDate);
      expect(back.getFullYear()).toBe(2026);
      expect(back.getMonth()).toBe(1);
      expect(back.getDate()).toBe(13);
    });
  });

  describe("isLeapYear", () => {
    it("5784 is a leap year", () => {
      expect(isLeapYear(5784)).toBe(true);
    });

    it("5785 is not a leap year", () => {
      expect(isLeapYear(5785)).toBe(false);
    });
  });

  describe("monthsInYear", () => {
    it("returns 13 for leap year", () => {
      expect(monthsInYear(5784)).toBe(13);
    });

    it("returns 12 for regular year", () => {
      expect(monthsInYear(5785)).toBe(12);
    });
  });

  describe("daysInMonth", () => {
    it("Tishrei always has 30 days", () => {
      expect(daysInMonth(5785, 7)).toBe(30);
    });

    it("Tevet always has 29 days", () => {
      expect(daysInMonth(5785, 10)).toBe(29);
    });
  });

  describe("hebrewYearDays", () => {
    it("returns a valid year length", () => {
      const days = hebrewYearDays(5785);
      expect(days).toBeGreaterThanOrEqual(353);
      expect(days).toBeLessThanOrEqual(385);
    });
  });
});
