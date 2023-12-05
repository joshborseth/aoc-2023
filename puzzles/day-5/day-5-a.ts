import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  class GardenMap {
    destination: number;
    source: number;
    range: number;

    constructor(mapStr: string) {
      const [destination, source, range] = mapStr
        .split(' ')
        .filter((str) => str !== '')
        .map(Number);

      this.destination = destination;
      this.source = source;
      this.range = range;
    }

    public isInRange(input: number) {
      return input >= this.source && input < this.source + this.range;
    }

    public output(input: number) {
      return input + this.destination - this.source;
    }
  }

  const parseSeeds = (line: string) => {
    return line
      .split(':')[1]
      .split(' ')
      .filter((number) => number !== '')
      .map(Number);
  };

  const parseGardenMapGroups = (lines: string[]) => {
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

  const calculateOutput = (input: number, gardenMapGroup: GardenMap[]) => {
    let output = input;
    for (const gardenMap of gardenMapGroup) {
      if (gardenMap.isInRange(output)) {
        output = gardenMap.output(output);
        if (input !== output) break;
      }
    }
    return output;
  };

  const calculateSeedLocation = (
    input: number,
    gardenMapGroups: GardenMap[][]
  ) => {
    let output = input;
    for (const gardenMapGroup of gardenMapGroups) {
      output = calculateOutput(output, gardenMapGroup);
    }
    return output;
  };

  const lines = data.map((line) => line.trim());
  const seeds = parseSeeds(lines[0]);
  const gardenMapGroups = parseGardenMapGroups(lines.slice(1));
  const locations = seeds.map((seed) =>
    calculateSeedLocation(seed, gardenMapGroups)
  );

  return locations.reduce((acc, location) => Math.min(acc, location), Infinity);
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
