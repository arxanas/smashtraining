// This code is adapted from https://github.com/sunaiwen/supermemo2.js/, which
// is licensed under the following terms:
//
// The MIT License (MIT)
//
// Copyright (c) 2016 Niven Su
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

export type Performance = 1 | 2 | 3 | 4 | 5;

/**
 * The "quality" of the practice. 0 is the worst and 5 is the best. Note that
 * the rest of the app uses only values from 1-5 (the `Performance` type
 * above).
 */
type Quality = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * An abstract measure of how soon until the item should be reviewed.
 * Higher values indicate that the item should be delayed for longer.
 * It seems to indicate how many days until the item should be reviewed.
 */
type Schedule = number;

/**
 * Difficulty factor for an item. Ranges from 1.3 to 2.5, with higher being
 * easier. See https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 */
export type Factor = number;

interface Item {
  factor: Factor;
  schedule: Schedule;
}

export function createItem(): Item {
  // The default value is 6, as per the second value in the sequence at
  // https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
  return { factor: 2.5, schedule: 6 };
}

export function compareItem(lhs: Item, rhs: Item): number {
  return lhs.schedule - rhs.schedule;
}

function calcFactor(oldFactor: Factor, quality: Quality) {
  return oldFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
}

export function updateItem(item: Item, performance: Performance): Item {
  if (performance < 3) {
    return item;
  } else {
    const newFactor = Math.max(calcFactor(item.factor, performance), 1.3);
    const newSchedule = Math.round(item.schedule * newFactor);
    return {
      factor: newFactor,
      schedule: newSchedule - item.schedule,
    };
  }
}
