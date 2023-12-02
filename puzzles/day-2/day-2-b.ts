import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  const formattedData = data.map((line) => {
    const splitLine = line.split(';');
    return splitLine.map((str) => {
      const splitStr = str.split(',');
      return splitStr.map((str) => {
        if (str.includes('Game')) {
          const splitAgain = str.split('');
          return splitAgain
            .splice(splitAgain.indexOf(':') + 1)
            .join('')
            .trim();
        }
        return str.trim();
      });
    });
  });
  const minRequiredCubes = formattedData.map((game) => {
    let redMax = 0;
    let greenMax = 0;
    let blueMax = 0;
    game.forEach((val) => {
      val.forEach((val) => {
        const numsRegex = /\d+/g;
        const num = Number(val.match(numsRegex));
        if (val.includes('red')) {
          if (num > redMax) redMax = num;
        } else if (val.includes('green')) {
          if (num > greenMax) greenMax = num;
        } else if (val.includes('blue')) {
          if (num > blueMax) blueMax = num;
        }
      });
    });
    return [redMax, greenMax, blueMax];
  });

  let total = 0;

  minRequiredCubes.forEach((game) => {
    total += game[0] * game[1] * game[2];
  });
  return total;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
