#!/usr/bin/env node

const yargs = require('yargs');

const fs = require('fs-extra');

const path = require('path');

const updateRoute = require('./update-router');

// Converts a kebab-case string to Camel Case

function toCamelCase(str) {

  return str.split('-').map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');

}



// Converts a kebab-case string to Upper Camel Case

function toUpperCamelCase(str) {

  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');

}



// Converts a kebab-case string to Kebab Case (no change needed)

function toKebabCase(str) {

  return str;

}



// Converts a kebab-case string to Snake Case

function toSnakeCase(str) {

  return str.replace(/-/g, '_');

}



// Converts a string to its plural form (appends an 's' if not present)

function toPlural(str) {

  return str.endsWith('s') ? str : str + 's';

}



// Converts a string to uppercase

function toUpperCase(str) {

  return str.toUpperCase();

}



// Applies a series of transformations to a string

function applyTransformations(entityName, transformations) {

  return transformations.reduce((result, func) => {

    switch (func) {

      case 'camelCase':

        return toCamelCase(result);

      case 'kebabCase':

        return toKebabCase(result);

      case 'upperCamelCase':

        return toUpperCamelCase(result);

      case 'snakeCase':

        return toSnakeCase(result);

      case 'plural':

        return toPlural(result);

      case 'upperCase':

        return toUpperCase(result);

      default:

        return result;

    }

  }, entityName);

}



// Function to process a single file or folder name

function processName(name, entityName) {

  const pattern = /__name(@[\w]+)*__/g;

  return name.replace(pattern, (_, ...transformationTokens) => {

    // Filter out any undefined transformation tokens and convert them to strings

    const transformations = transformationTokens

      .filter(Boolean)

      .map(t => String(t).replace('@', ''));



    return transformations.length > 0 ? applyTransformations(entityName, transformations) : entityName;

  });

}





// Recursive function to walk through the directory structure

async function processDirectory(src, dest, entityName) {

  const entries = await fs.readdir(src, { withFileTypes: true });

  await fs.ensureDir(dest);



  for (const entry of entries) {

    const srcPath = path.join(src, entry.name);

    const destPath = path.join(dest, processName(entry.name, entityName));



    if (entry.isDirectory()) {

      await processDirectory(srcPath, destPath, entityName);

    } else {

      if (/\.(html|scss|ts)\.template$/.test(entry.name)) {

        let data = await fs.readFile(srcPath, 'utf8');

        data = processName(data, entityName);

        await fs.outputFile(destPath.replace(/.template$/, ''), data);

      } else {

        await fs.copy(srcPath, destPath);

      }

    }

  }

}





// Main function of the script

async function main() {

  const args = yargs.argv;

  const entityName = args.name;

  const destPath = args.rootPath || './';

  console.log("Entity Name: " + entityName);
  console.log("destinationPath: " + destPath)


  if (!entityName || !destPath) {

    console.error('Both entityName and rootPath arguments are required');

    process.exit(1);

  }



  if (!/^[a-z]+(-[a-z]+)*$/.test(entityName)) {

    console.error('Entity name must be a single word or in kebab case (lowercase words separated by -)');

    process.exit(1);

  }



  const filesFolder = path.join(__dirname, '../packages/entity');

  await processDirectory(filesFolder, destPath, entityName);



  console.log('Files and directories have been processed and copied.');

  updateRoute(` {
    path: ${entityName}s,
    loadChildren: () => import('./${entityName}/${entityName}.routes'),
    providers: [
      provideState({name: '${toCamelCase(entityName)}State', reducer: ${toCamelCase(entityName)}Reducers})
    ]
  }`);
}





main();

