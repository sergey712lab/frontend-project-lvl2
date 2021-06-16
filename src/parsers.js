import yaml from 'js-yaml';

const parse = (format, Data) => {
  switch (format) {
    case '.json':
      return JSON.parse(Data);
    case '.yaml':
    case '.yml':
      return yaml.load(Data);
    default:
      throw new Error(`Unknown file format: '${format}'!`);
  }
};
export default parse;
