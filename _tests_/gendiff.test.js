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
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

test('stylish with json', () => {
  const diff = genDiff(file1Json, file2Json);
  expect(diff).toEqual(file1Stylish.trim());
});

test('stylish with yml', () => {
  const diff = genDiff(file1Yml, file2Yml);
  expect(diff).toEqual(file1Stylish.trim());
});

test('stylish with json', () => {
  const diff = genDiff(file1Json, file2Json);
  expect(diff).toEqual(file1Stylish.trim());
});
