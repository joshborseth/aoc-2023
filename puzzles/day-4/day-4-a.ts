import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  let count = 0;
  data.forEach((line) => {
    const twoLines = line.split('|');
    const colonIndex = twoLines[0].indexOf(':');
    const winningNumbers = twoLines[0]
      .slice(colonIndex + 1)
      .trim()
      .split(' ')
      .filter((num) => !!num);
    const myNumbers = twoLines[1]
      .trim()
      .split(' ')
      .filter((num) => !!num);

    const allNums = [...winningNumbers, ...myNumbers];
    const allNumsSet = new Set(allNums);
    const diffInSize = allNums.length - allNumsSet.size;
    if (!diffInSize) return;

    let total = 1;
    new Array(diffInSize).fill(0).forEach((_, i) => {
      if (i === 0) return;
      total *= 2;
    });

    count += total;
  });

  return count;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
