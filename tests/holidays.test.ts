import { describe, it, expect } from "vitest";
import { toHebrew, getHoliday, getHolidaysInMonth } from "../src/index.js";

describe("holidays", () => {
  it("detects Rosh Hashana", () => {
    const holiday = getHoliday({ year: 5785, month: 7, day: 1 });
    expect(holiday).not.toBeNull();
    expect(holiday?.name).toBe("Rosh Hashana");
    expect(holiday?.nameHe).toBe("ראש השנה");
    expect(holiday?.type).toBe("major");
  });

  it("detects Yom Kippur", () => {
    const holiday = getHoliday({ year: 5785, month: 7, day: 10 });
    expect(holiday?.name).toBe("Yom Kippur");
  });

  it("detects Pesach", () => {
    const holiday = getHoliday({ year: 5785, month: 1, day: 15 });
    expect(holiday?.name).toBe("Pesach");
  });

  it("detects Chanukah", () => {
    const holiday = getHoliday({ year: 5785, month: 9, day: 25 });
    expect(holiday?.name).toBe("Chanukah");
  });

  it("detects Purim", () => {
    const holiday = getHoliday({ year: 5785, month: 12, day: 14 });
    expect(holiday?.name).toBe("Purim");
  });

  it("detects Yom HaAtzmaut", () => {
    const holiday = getHoliday({ year: 5785, month: 2, day: 6 });
    expect(holiday?.name).toBe("Yom HaAtzmaut");
    expect(holiday?.type).toBe("modern");
  });

  it("detects Yom HaShoah", () => {
    const holiday = getHoliday({ year: 5785, month: 1, day: 27 });
    expect(holiday?.name).toBe("Yom HaShoah");
  });

  it("returns null for non-holiday", () => {
    const holiday = getHoliday({ year: 5785, month: 8, day: 5 });
    expect(holiday).toBeNull();
  });

  it("detects from Gregorian date", () => {
    const hDate = toHebrew(new Date(2024, 9, 3));
    const holiday = getHoliday(hDate);
    expect(holiday?.name).toBe("Rosh Hashana");
  });

  describe("getHolidaysInMonth", () => {
    it("finds holidays in Tishrei", () => {
      const holidays = getHolidaysInMonth(5785, 7);
      expect(holidays.length).toBeGreaterThan(5);
      const names = holidays.map((h) => h.holiday.name);
      expect(names).toContain("Rosh Hashana");
      expect(names).toContain("Yom Kippur");
      expect(names).toContain("Sukkot");
    });

    it("finds Chanukah in Kislev", () => {
      const holidays = getHolidaysInMonth(5785, 9);
      const names = holidays.map((h) => h.holiday.name);
      expect(names).toContain("Chanukah");
    });
  });
});
