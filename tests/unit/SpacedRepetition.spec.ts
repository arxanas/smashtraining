import {
  averagePerformance,
  compareItem,
  createItem,
  updateItem,
} from "@/tech/SpacedRepetition";

describe("SpacedRepetition", () => {
  const item1 = createItem();
  const item2 = createItem();

  it("should prefer items which haven't been done before", () => {
    const newItem1 = updateItem(item1, 3);
    expect(compareItem(newItem1, item2)).toBeGreaterThan(0);
  });

  it("should equally prefer items with the same results", () => {
    const newItem1 = updateItem(item1, 3);
    const newItem2 = updateItem(item2, 3);
    expect(compareItem(newItem1, newItem2)).toBe(0);
  });

  it("should prefer items which have worse results first", () => {
    const newItem1 = updateItem(item1, 1);
    const newItem2 = updateItem(item2, 5);
    expect(compareItem(newItem1, newItem2)).toBeLessThan(0);
  });

  it("should have a greater schedule each successful iteration", () => {
    let currentItem = item1;
    for (let i = 0; i < 10; i++) {
      const nextItem = updateItem(currentItem, 5);
      expect(nextItem.schedule).toBeGreaterThan(currentItem.schedule);
      currentItem = nextItem;
    }
  });

  it("should have a lesser or equal schedule most failed iterations", () => {
    let currentItem = item1;
    for (let i = 0; i < 20; i++) {
      // Performance is not <3, because then the item stays unchanged.
      const nextItem = updateItem(currentItem, 3);
      if (i > 3) {
        // The first few times seem to schedule the item far out anyways.
        expect(nextItem.schedule).toBeLessThanOrEqual(currentItem.schedule);
      }
      currentItem = nextItem;
    }
  });

  it("should average performances by rounding", () => {
    expect(averagePerformance([5, 5, 4])).toBe(5);
    expect(averagePerformance([4, 4, 4])).toBe(4);
    expect(averagePerformance([4, 4, 5])).toBe(4);
  });
});
