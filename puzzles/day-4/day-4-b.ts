import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);
  let copies = Array(data.length).fill(1);
  data.forEach((line, i) => {
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

    const winners = allNums.length - allNumsSet.size;

    for (let j = 1; j <= winners; j++) copies[i + j] += copies[i];
  });

  return copies.reduce((acc, curr) => acc + curr, 0);
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
