#!/usr/bin/env node
import program from 'commander';
import genDiff from '../files/genDiff.js';
// const program = new program();
program
  .version('0.1')  
  .description('Compares two configuration files and shows a difference.')  
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(JSON.parse(result));
  });
  
  program.parse();
