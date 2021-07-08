import _ from 'lodash';

const getIndent = (n) => ' '.repeat(n);

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = Object.keys(value)
    .map((key) => `${getIndent(depth + 8)}${key}: ${stringify(value[key], depth + 4)}`);
  return ['{', ...result, `${getIndent(depth + 4)}}`].join('\n');
};

const operation = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const formatDiffs = (tree) => {
  const iter = (node, depth) => {
    const result = node.map((item) => {
      const {
        key, type, initValue, newValue, children,
      } = item;
      switch (type) {
        case 'added':
          return `${getIndent(depth + 2)}${operation[type]}${key}: ${stringify(newValue, depth)}`;
        case 'removed':
        case 'unchanged':
          return `${getIndent(depth + 2)}${operation[type]}${key}: ${stringify(initValue, depth)}`;
        case 'changed':
          return `${getIndent(depth + 2)}${operation.removed}${key}: ${stringify(initValue, depth)}\n${getIndent(depth + 2)}${operation.added}${key}: ${stringify(newValue, depth)}`;
        case 'nested':
          return `${getIndent(depth + 2)}${operation.unchanged}${key}: ${iter(children, depth + 4)}`;
        default: throw new Error(`Unknown type: ${type}`);
      }
    });
    return ['{', ...result, `${getIndent(depth)}}`].join('\n');
  };
  return iter(tree, 0);
};

export default formatDiffs;
