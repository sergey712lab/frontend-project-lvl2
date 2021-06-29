import fs from 'fs';
import path from 'path';
import formatData from './formatters/index.js';
import createTree from './tree.js';
import parse from './parsers.js';

const getFileData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath));
  const format = path.extname(filepath).substring(1);
  return parse(data, format);
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);
  const tree = createTree(data1, data2);
  const formattedData = formatData(tree, formatName);
  return formattedData;
};

export default gendiff;
