import yaml from 'js-yaml';

const parsers = {
  yml: yaml.load,
  json: JSON.parse,
  yaml: yaml.load,
};

export default (data, format) => {
  const parse = parsers[format];
  return parse(data);
};
