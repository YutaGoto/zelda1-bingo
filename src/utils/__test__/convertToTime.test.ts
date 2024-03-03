import { expect, test } from "vitest";

import { convertToTime } from "../convertToTime";

test("convertToTime", () => {
  expect(convertToTime({ time: 0 })).toBe("0:00:00.000");
  expect(convertToTime({ time: 1 })).toBe("0:00:00.001");
  expect(convertToTime({ time: 1000 })).toBe("0:00:01.000");
  expect(convertToTime({ time: 60000 })).toBe("0:01:00.000");
  expect(convertToTime({ time: 3600000 })).toBe("1:00:00.000");
  expect(convertToTime({ time: 3661000 })).toBe("1:01:01.000");
});

test("convertToTime without milliseconds", () => {
  expect(convertToTime({ time: 0, isMillisecond: false })).toBe("0:00:00");
  expect(convertToTime({ time: 1000, isMillisecond: false })).toBe("0:00:01");
  expect(convertToTime({ time: 60000, isMillisecond: false })).toBe("0:01:00");
  expect(convertToTime({ time: 3600000, isMillisecond: false })).toBe(
    "1:00:00",
  );
  expect(convertToTime({ time: 3661000, isMillisecond: false })).toBe(
    "1:01:01",
  );
});
