import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);

  const numbers = data.map((line, i) => {
    const splitLine = line.split('');
    const nums = splitLine.filter((num) => {
      if (!isNaN(parseInt(num))) {
        return parseInt(num);
      }
    });
    const firstNum = nums[0];
    const lastNum = nums[nums.length - 1];
    const firstAndLastNum = `${firstNum}${lastNum}`;
    return parseInt(firstAndLastNum);
  });

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum;
}

const answer = await day1a();

console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
