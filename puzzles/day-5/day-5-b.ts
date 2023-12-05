import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);

  class Range {
    constructor(
      public readonly start: number,
      public readonly end: number,
      public isTransformed = false
    ) {}

    get length() {
      return this.end - this.start;
    }

    public getIntersection(range: Range): Range | null {
      if (this.end <= range.start || this.start >= range.end) return null;
      return new Range(
        Math.max(this.start, range.start),
        Math.min(this.end, range.end)
      );
    }

    public subtractIntersection(intersection: Range): Range[] {
      const result: Range[] = [];
      if (this.start < intersection.start) {
        result.push(new Range(this.start, intersection.start));
      }
      if (this.end > intersection.end) {
        result.push(new Range(intersection.end, this.end));
      }
      return result;
    }
  }

  class GardenMap {
    public destination: Range;
    public source: Range;

    constructor(mapStr: string) {
      const [destinationStart, sourceStart, length] = mapStr
        .split(' ')
        .filter((str) => str !== '')
        .map(Number);

      this.destination = new Range(destinationStart, destinationStart + length);
      this.source = new Range(sourceStart, sourceStart + length);
    }

    get offset() {
      return this.destination.start - this.source.start;
    }

    public transformRange(inputRange: Range): Range[] {
      if (inputRange.isTransformed) return [inputRange];

      const intersection = this.source.getIntersection(inputRange);

      if (!intersection) return [inputRange];

      const transformed = new Range(
        intersection.start + this.offset,
        intersection.end + this.offset,
        true
      );

      return [transformed, ...inputRange.subtractIntersection(intersection)];
    }
  }

  const parseSeedRanges = (line: string): Range[] => {
    const numbers = line
      .split(':')[1]
      .split(' ')
      .filter((number) => number !== '')
      .map(Number);

    const ranges: Range[] = [];
    for (let i = 0; i < numbers.length; i += 2) {
      ranges.push(new Range(numbers[i], numbers[i] + numbers[i + 1]));
    }

    return ranges;
  };

  const parseGardenMapGroups = (lines: string[]): GardenMap[][] => {
    const gardenMapGroups: GardenMap[][] = [];
    lines.forEach((line) => {
      if (line === '') {
        gardenMapGroups.push([]);
        return;
      }
      if (line.endsWith(':')) return;
      gardenMapGroups[gardenMapGroups.length - 1].push(new GardenMap(line));
    });
    return gardenMapGroups;
  };

  const resetTransformed = (ranges: Range[]): void => {
    for (const range of ranges) {
      range.isTransformed = false;
    }
  };

  const calculateGardenMapGroupTransform = (
    ranges: Range[],
    gardenMapGroup: GardenMap[]
  ): Range[] => {
    for (const gardenMap of gardenMapGroup) {
      ranges = ranges.flatMap((range) => gardenMap.transformRange(range));
    }
    return ranges;
  };

  const calculateSeedLocation = (
    ranges: Range[],
    gardenMapGroups: GardenMap[][]
  ): Range[] => {
    for (const gardenMapGroup of gardenMapGroups) {
      resetTransformed(ranges);
      ranges = calculateGardenMapGroupTransform(ranges, gardenMapGroup);
    }
    return ranges;
  };

  const getMin = (ranges: Range[]): number => {
    let min = Infinity;
    for (const range of ranges) {
      min = Math.min(min, range.start);
    }
    return min;
  };

  const lines = data.map((line) => line.trim());
  const seedRanges = parseSeedRanges(lines[0]);
  const gardenMapGroups = parseGardenMapGroups(lines.slice(1));

  return getMin(calculateSeedLocation(seedRanges, gardenMapGroups));
}

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
