#!/usr/bin/env node

import shell from 'shelljs';
import concurrently from 'concurrently';
import { createFile, createContent, createConfigFiles, createStartFiles } from './createFiles';
import { getGenType, getAny, getAnyFree, getCssType, getPackageManager, getBuilder, getGit } from './questions';
import { failure, info, success, initFinishedMessage } from './messages';
import { hasConfig, canInit } from './utils';
const [, , ...args] = process.argv;

const run = () => {
  const argOne = args[0] === undefined ? '' : args[0].toLowerCase();
  const argTwo = args[1] === undefined ? '' : args[1].toLowerCase();
  const argThree = args[2] === undefined ? '' : args[2];

  switch (argOne) {
    case 'generate':
    case 'g':
      generate(argTwo, argThree);
      break;
    case 'serve':
    case 's':
      serve();
      break;
    case 'init':
    case 'i':
      init(argTwo, argThree);
      break;
    case 'build':
    case 'b':
      build();
      break;
    case 'test':
      if (shell.which('code')) {
        console.log('CODE');
      } else {
        console.log('AAAAAAAAAAAAAAAAAAA');
      }
      console.log(shell.which('code'));
      break;
    default:
      failure('Error! No Command Given.');
  }
};

const generate = async (argTwo: string, argThree: string) => {
  const cat = hasConfig(false);
  if (cat !== null) {
    const ecconfigContent = JSON.parse(cat.stdout);
    switch (argTwo) {
      case 'c':
      case 'component':
        if (argThree !== '') {
          const files = ['ts', ecconfigContent.css, 'html'];
          let path = argThree.split('/');
          path.unshift('src');
          const fileName = path[path.length - 1];
          const pathString = path.join('/');
          files.forEach(fileType => {
            createFile(pathString, fileName, fileType, createContent(fileType, fileName));
          });
        } else {
          failure('No Component Name Given!');
        }
        break;
      default:
        failure('Error! No Type Selected.');
        const genType = await getGenType();
        const { GENTYPE } = genType;
        const genName = await getAny('name', GENTYPE);
        generate(GENTYPE, genName.RETURN);
    }
  }
};

async function serve() {
  const cat = hasConfig(false);
  if (cat !== null) {
    const ecconfigContent = JSON.parse(cat.stdout);

    const commands = [
      { name: 'Typescript', command: 'tsc -w', prefixColor: 'blue.bold' },
      { name: 'Electron', command: 'electron .', prefixColor: 'green' }
    ];
    if (ecconfigContent.css === 'sass') {
      commands.unshift({ name: 'sass', command: 'sass --watch src:dist', prefixColor: 'magentaBright' });
    }
    const serveExitInfo = () => {};
    concurrently(commands, {
      prefix: 'name',
      killOthers: ['serveExitInfo', 'success']
    }).then(success, serveExitInfo);
  }
}

const init = async (argTwo: string, argThree: string) => {
  let projectName: string;
  let skip: boolean;
  if (argTwo !== '') {
    projectName = argTwo;
    skip = argThree === '-s' ? true : false;
  } else {
    skip = false;
    const name = await getAny('name', 'Project');
    if (name.RETURN === '') {
      failure('Please Enter a Name.');
      init('', '');
      return;
    }
    projectName = name.RETURN;
  }
  const cat = canInit(projectName);
  if (cat === null) {
    const git = await getGit();
    const id = await getAny('id', 'Project', projectName);
    const description = await getAny('description', 'Project');
    const author = await getAnyFree('Who is the author of the Project');
    const version = await getAny('version', 'Project', '1.0.0');
    const category = await getAny('category', 'Project', 'public.app-category.' + projectName);
    const license = await getAny('license', 'Project', 'MIT');

    let options = {
      css: 'css',
      builder: 'electron-builder'
    };
    let packageManager = 'npm';
    if (!skip) {
      const cssType = await getCssType();
      options.css = cssType.RETURN;
      const pm = await getPackageManager();
      packageManager = pm.RETURN;
      const builder = await getBuilder();
      options.builder = builder.RETURN;
    }
    const contentVars = {
      name: projectName,
      desc: description.RETURN,
      author: author.RETURN,
      version: version.RETURN,
      license: license.RETURN,
      id: id.RETURN,
      category: category.RETURN,
      options: options
    };
    createConfigFiles(['package', 'tsconfig', 'ecconfig'], projectName, contentVars);
    // § src
    createStartFiles(['main.ts', 'main.' + options.css, 'main.html'], ['ts', options.css, 'html'], projectName, 'src', contentVars);
    // § dist
    const distFiles = {
      contentId: ['main.js'],
      extensions: ['js']
    };
    if (options.css === 'sass') {
      distFiles.extensions.push('css');
      distFiles.contentId.push('main.css');
    }
    createStartFiles(distFiles.contentId, distFiles.extensions, projectName, 'dist', contentVars);

    if (packageManager !== 'none') {
      shell.cd(projectName);
      if (git.RETURN === 'Yes') {
        shell.exec('git init');
        info('Initializing Git');
        createFile('', '.gitignore', undefined, createContent('git'));
      }
      info('Installing...');
      shell.exec(packageManager === 'npm' ? 'npm i' : packageManager);
      success('Done! Packages Installed.');
      if (shell.which('code')) {
        shell.exec('code .');
      }
      initFinishedMessage(projectName);
    } else {
      info('Please install packages using yarn or npm');
    }
  } else {
    failure(`Error! Project ${projectName} already exists.`);
  }
};

const build = () => {
  const cat = hasConfig(false);
  if (cat !== null) {
    const ecconfigContent = JSON.parse(cat.stdout);
    switch (ecconfigContent.builder) {
      case 'electron-builder':
        shell.exec('npm run dist');
        break;
      default:
        failure('No Builder Selected.');
        break;
    }
  }
};

run();
