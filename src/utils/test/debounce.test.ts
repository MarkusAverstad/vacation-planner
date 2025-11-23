import { debounce } from "utils";
import { beforeAll, expect } from "vitest";

describe("debounce", () => {
  beforeAll(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
    });
  });

  it("should delay a call by exactly 300s", () => {
    const mockFunction = vi.fn();
    const debouncedMockFunction = debounce(mockFunction, 300);

    debouncedMockFunction();

    vi.advanceTimersByTime(299);
    expect(mockFunction).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(mockFunction).toHaveBeenCalled();
  });
});
