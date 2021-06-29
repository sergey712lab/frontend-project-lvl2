import _ from 'lodash';
import makePlain from './plain.js';
import makeStylish from './stylish.js';

const formatters = {
  stylish: makeStylish,
  plain: makePlain,
  json: JSON.stringify,
};

const formatData = (tree, format) => {
  if (!_.has(formatters, format)) {
    throw new Error('the chosen format is not valid');
  }
  return formatters[format](tree);
};

export default formatData;
