import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Stylish = readFile('result.txt');
const filePlain = readFile('plain.txt');
const fileJson = readFile('json.txt');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

test.each([[file1Json, file2Json], [file1Yml, file2Yml]])('stylish', (file1path, file2path) => {
  const diff = genDiff(file1path, file2path);
  expect(diff).toEqual(file1Stylish.trim());
});

test('stylish with json and yml', () => {
  const diff = genDiff(file1Json, file2Yml);
  expect(diff).toEqual(file1Stylish.trim());
});

test('stylish exact', () => {
  const diff = genDiff(file1Json, file2Yml, 'stylish');
  expect(diff).toEqual(file1Stylish.trim());
});

test('plain', () => {
  const diff = genDiff(file1Json, file2Json, 'plain');
  expect(diff).toEqual(filePlain.trim());
});

test('plain yml', () => {
  const diff = genDiff(file1Yml, file2Yml, 'plain');
  expect(diff).toEqual(filePlain.trim());
});

test('json', () => {
  const diff = genDiff(file1Json, file2Json, 'json');
  expect(diff).toEqual(fileJson.trim());
});
