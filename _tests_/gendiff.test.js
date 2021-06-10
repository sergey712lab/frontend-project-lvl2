import fs from 'fs';
import path from 'path';
import genDiff from '../files';

const templates = [
  [
    'before.json',
    'after.json',
  ],

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'UTF-8');

test.each(templates)('compare config, output format - json', (fileName1, fileName2) => {
  const fullPath1 = getFixturePath(fileName1);
  const fullPath2 = getFixturePath(fileName2);
  const expectedValue = readFile('result-json.txt');
  const actualValue = genDiff(fullPath1, fullPath2, 'json');
  expect(actualValue).toEqual(expectedValue);
});
