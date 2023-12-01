import { readData } from '../../shared.ts';
import chalk from 'chalk';

const DIGIT_MAP = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);

  const numbers = data.map((line, i) => {
    let newLine = line;
    Object.keys(DIGIT_MAP).forEach((digit) => {
      const replaceWith = DIGIT_MAP[digit];
      newLine = newLine.replaceAll(
        digit,
        //hehehehehehehehe
        `${digit[0]}${replaceWith}${digit[digit.length - 1]}`
      );
    });
    const splitLine = newLine.split('');
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

const answer = await day1b();

console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
