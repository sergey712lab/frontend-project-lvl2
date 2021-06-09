import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const genDiff = (pathToFile1, pathToFile2) => {
  const fullPath1 = path.resolve(process.cwd(), pathToFile1);
  const fullPath2 = path.resolve(process.cwd(), pathToFile2);
  const beforeObj = JSON.parse(fs.readFileSync(fullPath1, 'utf8'));
  const afterObj = JSON.parse(fs.readFileSync(fullPath2, 'utf8'));
  const beforeEntries = Object.entries(beforeObj);
  const afterEntries = Object.entries(afterObj);

  const beforeReducer = (aftObj, beforeEntry) => {
    const [key, value] = beforeEntry;
    if (!_.has(aftObj, key)) {
      return { [`- ${key}`]: value };
    }
    if (aftObj[key] === value) {
      return { [`  ${key}`]: value };
    }
    return [{ [`- ${key}`]: value }, { [`+ ${key}`]: aftObj[key] }];
  };

  const afterReducer = (befObj, afterEntry) => {
    const [key, value] = afterEntry;
    return !_.has(befObj, key) ? { [`+ ${key}`]: value } : undefined;
  };

  const result1 = beforeEntries
    .reduce((acc, beforeEntry) => [...acc, beforeReducer(afterObj, beforeEntry)], [])
    .flat();
  const result2 = afterEntries
    .reduce((acc, afterEntry) => [...acc, afterReducer(beforeObj, afterEntry)], [])
    .filter((entry) => entry);

  return JSON.stringify(result1.concat(result2));
};

export default genDiff;
