import shell from 'shelljs';
import { successFile } from './messages';
import { normalize } from 'path';
/**
 * Create a file name based on the input parameters.
 * @param path relative path, after the path of cmd/terminal.
 * @param fileName name of the file.
 * @param type Extension Type of the file.
 */
export const createFilePath = (path: string, fileName: string, type: string | undefined) => {
  return `${normalize(process.cwd() + '/' + path)}/${fileName}${type === undefined ? '' : '.'.concat(type)}`;
};

/**
 * Creates the content for the specified type.
 * @param type content type
 * @param path relative path of the content references Example for html: <script src="./${path}.js"></script>
 * @param contentVars content object.
 */
export const createContent = (type: any, path?: string, contentVars?: any) => {
  switch (type) {
    case 'html':
      return `<div>
    <link rel="stylesheet" type="text/css" href="./${path}.css">
    <script src="./${path}.js"></script>
</div>`;
    case 'package.json':
      return `{
  "name": "${contentVars.name}",
  "description": "${contentVars.desc}",
  "author": "${contentVars.author}",
  "version": "${contentVars.version}",
  "main": "dist/main.js",
  "license": "${contentVars.license}",
  "build": {
    "appId": "${contentVars.id}",
    "mac": {
      "category": "${contentVars.category}"
    }
  },${getBuilderType(contentVars.options.builder).script}
  "dependencies": {
  },
  "devDependencies": {
    "electron": "^5.0.2",${getBuilderType(contentVars.options.builder).dep}
    "typescript": "^3.5.1",
    "electron-reload": "^1.4.0"
  }
}`;
    case 'tsconfig.json':
      return `{
  "compilerOptions": {
    /* Basic Options */
    "incremental": true                       /* Enable incremental compilation */,
    "target": "es5"                           /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "commonjs"                      /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "./dist"                    /* Redirect output structure to the directory. */,
    "rootDir": "./src",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true                            /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    "types": ["node"]                         /* Type declaration files to be included in compilation. */,
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}`;
    case 'main.ts':
      return `'use strict';
import { app, BrowserWindow } from 'electron';

require('electron-reload')(__dirname);

let appWindow: BrowserWindow | null;

function createWindow() {
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#222',
    webPreferences: {
      nodeIntegration: true
    }
  });

  appWindow.loadFile('./src/main.html');

  appWindow.webContents.openDevTools();

  appWindow.on('closed', () => {
    appWindow = null;
  });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (appWindow === null) {
    createWindow();
  }
});
`;
    case 'main.js':
      return `'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
require('electron-reload')(__dirname);
var appWindow;
function createWindow() {
    appWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#222',
        webPreferences: {
            nodeIntegration: true
        }
    });
    appWindow.loadFile('./src/main.html');
    appWindow.webContents.openDevTools();
    appWindow.on('closed', function () {
        appWindow = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (appWindow === null) {
        createWindow();
    }
});
`;
    case 'main.html':
      return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>${contentVars.name}</title>
    <link rel="stylesheet" type="text/css" href="../${contentVars.options.css === 'css' ? 'src' : 'dist'}/main.css">
</head>

<body>
    <h1> ${contentVars.name} </h1>
    We are using node
    <script>document.write(process.versions.node)</script>,
    Chrome
    <script>document.write(process.versions.chrome)</script>,
    and Electron
    <script>document.write(process.versions.electron)</script>.
</body>

</html>
`;
    case 'main.css':
      return `* {
   color: #eee;
    background: #222;
}`;
    case 'main.sass':
      return `*
    color: #eee
    background: #222
`;
    case 'ecconfig.json':
      return `${JSON.stringify(contentVars.options)}`;
    case 'git':
      return 'node_modules';
    default:
      return '';
  }
};

/**
 * Create a file based on the input parameters.
 * @param dir relative path of the file.
 * @param fileName name of the file.
 * @param type Extension Type of the file.
 */
export const createFile = (dir: string, fileName: string, type: string | undefined, fileContent: string) => {
  shell.mkdir('-p', dir);
  const filePath = createFilePath(dir, fileName, type);
  shell.touch(filePath);
  shell.sed('-i', /.*/, fileContent, filePath);
  successFile(normalize(filePath));
};
/**
 * creates the .json config files.
 */
export const createConfigFiles = (files: string[], projectName: string, contentVars: any) => {
  files.forEach(file => {
    createFile(projectName, file, 'json', createContent(file + '.json', file, contentVars));
  });
};
/**
 * utility for the main files [main.ts, main.css/sass, main.html].
 */
export const createStartFiles = (contentIds: string[], extensions: string[], projectName: string, dir: string, contentVars: any) => {
  contentIds.forEach((id, index) => {
    createFile(projectName + `/${dir}`, 'main', extensions[index], createContent(id, 'main', contentVars));
  });
};

const getBuilderType = (type: string) => {
  switch (type) {
    case 'electron-builder':
      return {
        script: `
  "scripts": {
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },`,
        dep: `
    "electron-builder": "^20.43.0",`
      };

    default:
      return {
        script: '',
        dep: ''
      };
  }
};
