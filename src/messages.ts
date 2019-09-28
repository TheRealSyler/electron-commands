import chalk from 'chalk';

export const successFile = (filePath: string) => {
  console.log(chalk.green.bold(`Done! File created at ${filePath}`));
};
export const success = (message: any) => {
  console.log(chalk.green.bold(message));
};
export const failure = (message: string) => {
  console.log(chalk.red.bold(message));
};
export const info = (message: string) => {
  console.log(chalk.yellow.bold(message));
};
export const initFinishedMessage = (name: string) => {
  console.log(chalk`

  {bgBlackBright.whiteBright.bold  cd ${name} }

  then run {bgBlackBright.whiteBright.bold  ec serve } to start the project.
`);
};
export const successFileChange = (type: '.sass' | '.html', filePath: string) => {
  switch (type) {
    case '.sass':
      console.log(chalk.magentaBright.bold('[sass]'), chalk.green(`File Changed at ${filePath}`));
      break;
  }
};
