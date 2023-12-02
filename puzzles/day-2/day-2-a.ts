import { readData } from '../../shared.ts';
import chalk from 'chalk';

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;
export async function day2a(dataPath?: string) {
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
  const possibleGames = formattedData.map((game) => {
    return game.every((line) => {
      return line.every((val) => {
        const numsRegex = /\d+/g;
        const num = Number(val.match(numsRegex));
        if (val.includes('red')) {
          if (num > RED_CUBES) return false;
        } else if (val.includes('green')) {
          if (num > GREEN_CUBES) return false;
        } else if (val.includes('blue')) {
          if (num > BLUE_CUBES) return false;
        }
        return true;
      });
    });
  });

  let count = 0;
  possibleGames.forEach((game, i) => {
    if (game) count += i + 1;
  });
  return count;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
