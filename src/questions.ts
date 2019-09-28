import inquirer = require('inquirer');

export const getGenType = (): any => {
  const questions: any[] = [
    {
      type: 'list',
      name: 'GENTYPE',
      message: 'Select Generation Type.',
      choices: ['component', 'WIP']
    }
  ];
  return inquirer.prompt(questions);
};
export const getInitType = (): any => {
  const questions: any[] = [
    {
      type: 'list',
      name: 'INITTYPE',
      message: 'Select Init Type.',
      choices: ['Simple', 'Advanced']
    }
  ];
  return inquirer.prompt(questions);
};
export const getCssType = (): any => {
  const questions: any[] = [
    {
      type: 'list',
      name: 'RETURN',
      default: 'sass',
      message: "Select CSS Type (in order to use 'sass' dart-sass has to be installed)",
      choices: ['sass', 'css']
    }
  ];
  return inquirer.prompt(questions);
};
/**
 * What is the ${argOne} of the ${argTwo}.
 * @param argOne
 * @param argTwo
 */
export const getAny = (argOne: string, argTwo: string, defaultValue?: string): any => {
  const questions: any[] = [
    {
      name: 'RETURN',
      type: 'input',
      default: defaultValue,
      message: `What is the ${argOne} of the ${argTwo}`
    }
  ];
  return inquirer.prompt(questions);
};
export const getAnyFree = (message: string, defaultValue?: string): any => {
  const questions: any[] = [
    {
      name: 'RETURN',
      type: 'input',
      default: defaultValue,
      message: message
    }
  ];
  return inquirer.prompt(questions);
};
export const getPackageManager = (): any => {
  const questions: any[] = [
    {
      type: 'list',
      name: 'RETURN',
      default: 'npm',
      message: 'Select Package Manager.',
      choices: ['npm', 'yarn', 'none']
    }
  ];
  return inquirer.prompt(questions);
};
export const getBuilder = (): any => {
  const questions: any[] = [
    {
      type: 'list',
      name: 'RETURN',
      default: 'electron-builder',
      message: 'Select Builder.',
      choices: ['electron-builder', 'none']
    }
  ];
  return inquirer.prompt(questions);
};
export const getGit = (): any => {
  const questions: any[] = [
    {
      type: 'list',
      name: 'RETURN',
      default: 'Yes',
      message: 'Initialize Git ?',
      choices: ['Yes', 'No']
    }
  ];
  return inquirer.prompt(questions);
};
