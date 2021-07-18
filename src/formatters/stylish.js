import _ from 'lodash';

const stringify = (value, indent, inline = false) => {
  const arrayToString = (arr) => arr.map((el) => stringify(el, indent, true)).join(', ');
  const objectToString = (obj) => Object.entries(obj)
    .map(([k, v]) => `${' '.repeat(indent + 4)}${k}: ${stringify(v, indent + 4)}`)
    .join('\n');
  const objectToStringInline = (obj) => Object.entries(obj)
    .map(([k, v]) => `${k}: ${stringify(v, indent + 4)}`)
    .join(', ');

  if (_.isArray(value)) {
    return `[${arrayToString(value)}]`;
  }

  if (_.isPlainObject(value)) {
    return inline
      ? `{ ${objectToStringInline(value)} }`
      : `{\n${objectToString(value)}\n${' '.repeat(indent)}}`;
  }

  return value;
};

const tree = (diff, indent = 0) => {
  const list = diff.map((node) => {
    switch (node.status) {
      case 'added':
        return `${' '.repeat(indent + 2)}+ ${node.key}: ${stringify(node.valueAfter, indent + 4)}`;
      case 'removed':
        return `${' '.repeat(indent + 2)}- ${node.key}: ${stringify(node.valueBefore, indent + 4)}`;
      case 'changed':
        return `${' '.repeat(indent + 2)}- ${node.key}: ${stringify(node.valueBefore, indent + 4)}\n${' '.repeat(indent + 2)}+ ${node.key}: ${stringify(node.valueAfter, indent + 4)}`;
      case 'unchanged':
        return `${' '.repeat(indent + 2)}  ${node.key}: ${stringify(node.valueBefore, indent + 4)}`;
      case 'nested':
        return `${' '.repeat(indent + 2)}  ${node.key}: ${tree(node.children, indent + 4)}`;

      default:
        throw new RangeError(`(${node.status}): Invalid value: Only valid value is added, removed, changed, unchanged, nested`);
    }
  });

  return `{\n${list.join('\n')}\n${' '.repeat(indent)}}`;
};

export default tree;
