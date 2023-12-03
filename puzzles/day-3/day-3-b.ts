import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day3b(dataPath?: string) {
  let count = 0;
  const data = await readData(dataPath);
  data.forEach((line, i) => {
    const splitLine = line.split('');
    splitLine.forEach((char, x) => {
      if (char !== '*') return;

      const findFullNum = ({ x, y }: { x: number; y: number }) => {
        let char = data[y]?.[x];
        if (!char) return;
        if (isNaN(Number(char))) return;
        for (let i = x; i < data[y].length; i++) {
          if (i === x) continue;
          let newChar = data[y][i];
          if (!newChar) break;
          if (isNaN(Number(newChar))) break;
          char = `${char}${newChar}`;
        }

        for (let i = x; i >= 0; i--) {
          if (i === x) continue;
          let newChar = data[y][i];
          if (!newChar) break;
          if (isNaN(Number(newChar))) break;
          char = `${newChar}${char}`;
        }
        return Number(char);
      };
      const numLeft = findFullNum({ y: i, x: x - 1 });
      const numAfter = findFullNum({ y: i, x: x + 1 });
      const numAbove = findFullNum({ y: i - 1, x });
      const numBelow = findFullNum({ y: i + 1, x });
      const numAboveLeft = findFullNum({ y: i - 1, x: x - 1 });
      const numAboveRight = findFullNum({ y: i - 1, x: x + 1 });
      const numBelowLeft = findFullNum({ y: i + 1, x: x - 1 });
      const numBelowRight = findFullNum({ y: i + 1, x: x + 1 });

      const nums = [
        numLeft,
        numAfter,
        numAbove,
        numBelow,
        numAboveLeft,
        numAboveRight,
        numBelowLeft,
        numBelowRight,
      ];

      const removeUndefined = nums.filter((num) => !!num);
      const removeDuplicates = [...new Set(removeUndefined)];

      if (removeDuplicates.length > 1) {
        if (removeDuplicates.length !== 2)
          throw new Error('numsToMultiply.length !== 2');
        const gearProduct = removeDuplicates.reduce(
          (acc, curr) => acc * curr,
          1
        );
        count += Number(gearProduct);
      }
    });
  });
  return count;
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
