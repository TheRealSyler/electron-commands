import { failure } from './messages';
import shell from 'shelljs';

export const hasConfig = (silent: boolean) => {
  const silentState = shell.config.silent;
  shell.config.silent = true;
  const cat = shell.cat('ecconfig.json');
  shell.config.silent = silentState;
  if (cat.stderr === null) {
    return cat;
  } else {
    if (!silent) {
      failure('Error! No ecconfig.json Found.');
    }
    return null;
  }
};
export const canInit = (projectName: string) => {
  const silentState = shell.config.silent;
  shell.config.silent = true;
  const cdErr = shell.cd(projectName).stderr;
  const cat = hasConfig(true);
  if (cdErr === null) {
    shell.cd('../');
  }
  shell.config.silent = silentState;
  return cat;
};
