import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Stylish = readFile('result.txt');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');

test('stylish with json', () => {
  const diff = genDiff(file1Json, file2Json);
  expect(diff).toEqual(file1Stylish.trim());
});
