import { readData } from '../../shared.ts';
import chalk from 'chalk';

const check = (chars: (string[] | string)[]) => {
  const flatChars = chars.flat();
  const all = flatChars.filter((char) => {
    if (!char) return false;
    if (char === '.') return false;
    if (isNaN(Number(char))) return true;
  });
  return all.length > 0;
};

export async function day3a(dataPath?: string) {
  let count = 0;
  const data = await readData(dataPath);
  const globalArr = [];
  data.forEach((line, i) => {
    const splitLine = line.split('');
    const usedIndexes = [];
    splitLine.forEach((char, x) => {
      if (usedIndexes.includes(x)) return;
      if (char === '.') return;
      if (!isNaN(Number(char))) {
        let buildingNum = char;
        for (let j = x + 1; j < splitLine.length; j++) {
          if (isNaN(Number(splitLine[j]))) break;
          buildingNum = `${buildingNum}${splitLine[j]}`;
          usedIndexes.push(j);
        }
        globalArr.push(buildingNum);

        const charLeft = splitLine[x - 1];
        const charAfter = splitLine[x + buildingNum.length];
        const charsAbove = data[i - 1]
          ?.slice(x, x + buildingNum.length)
          .split('');
        const charsBelow = data[i + 1]
          ?.slice(x, x + buildingNum.length)
          .split('');

        const charAboveLeft = data[i - 1]?.[x - 1];
        const charAboveRight = data[i - 1]?.[x + buildingNum.length];
        const charBelowLeft = data[i + 1]?.[x - 1];
        const charBelowRight = data[i + 1]?.[x + buildingNum.length];

        const isPartNumber = check([
          charLeft,
          charAfter,
          charsAbove,
          charsBelow,
          charAboveLeft,
          charAboveRight,
          charBelowLeft,
          charBelowRight,
        ]);

        if (isPartNumber) {
          count += Number(buildingNum);
        }
      }
    });
  });
  return count;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
