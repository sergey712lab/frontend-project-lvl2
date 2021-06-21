import fs from 'fs';
import path from 'path';
import formatData from './formatters/index.js';
import createTree from './tree.js';
import parse from './parsers.js';

const getFileData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath));
  const format = path.extname(filepath);
  return parse(data, format);
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  const tree = createTree(object1, object2);
  const formattedData = formatData(tree, formatName);
  return formattedData;
};

export default gendiff;
