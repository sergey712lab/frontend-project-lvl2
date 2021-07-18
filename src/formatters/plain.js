import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const innerMakePlain = (tree, key = '') => {
  const makeFlat = (prop) => {
    switch (prop.status) {
      case 'added':
        return `Property '${key}${prop.key}' was added with value: ${stringify(prop.valueAfter)}`;
      case 'removed':
        return `Property '${key}${prop.key}' was removed`;
      case 'changed':
        return `Property '${key}${prop.key}' was updated. From ${stringify(prop.valueBefore)} to ${stringify(prop.valueAfter)}`;
      case 'unchanged':
        return '';
      case 'nested':
        return innerMakePlain(prop.children, `${key}${prop.key}.`);
      
      default:
        throw new Error(`Unknown status: '${prop.status}'!`);
    }
  };
  const editedOutput = tree.map((prop) => makeFlat(prop));
  const filteredElements = editedOutput.filter((element) => element !== '');
  return filteredElements.join('\n');
};

const makePlain = (tree) => innerMakePlain(tree);
export default makePlain;
