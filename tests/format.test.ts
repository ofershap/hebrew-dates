import { describe, it, expect } from "vitest";
import {
  formatHebrew,
  formatHebrewEn,
  getMonthName,
  getMonthNameEn,
} from "../src/index.js";

describe("format", () => {
  it("formats 1 Tishrei 5785 in Hebrew", () => {
    const result = formatHebrew({ year: 5785, month: 7, day: 1 });
    expect(result).toContain("א׳");
    expect(result).toContain("תשרי");
  });

  it("formats 15 Nisan in Hebrew", () => {
    const result = formatHebrew({ year: 5784, month: 1, day: 15 });
    expect(result).toContain("ט״ו");
    expect(result).toContain("ניסן");
  });

  it("formats in English", () => {
    const result = formatHebrewEn({ year: 5785, month: 7, day: 1 });
    expect(result).toBe("1 Tishrei 5785");
  });

  it("formats 25 Kislev in English", () => {
    const result = formatHebrewEn({ year: 5785, month: 9, day: 25 });
    expect(result).toBe("25 Kislev 5785");
  });

  describe("getMonthName", () => {
    it("returns Hebrew month name", () => {
      expect(getMonthName(7, false)).toBe("תשרי");
      expect(getMonthName(1, false)).toBe("ניסן");
    });

    it("returns Adar I for leap year month 12", () => {
      expect(getMonthName(12, true)).toBe("אדר א׳");
    });

    it("returns Adar II for leap year month 13", () => {
      expect(getMonthName(13, true)).toBe("אדר ב׳");
    });
  });

  describe("getMonthNameEn", () => {
    it("returns English month name", () => {
      expect(getMonthNameEn(7, false)).toBe("Tishrei");
    });

    it("returns Adar I for leap year month 12", () => {
      expect(getMonthNameEn(12, true)).toBe("Adar I");
    });
  });
});
