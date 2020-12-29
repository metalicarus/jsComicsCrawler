const node = process.env.NODE_ENV;
const config = require((node == 'development') ? './development.json' : './production.json');

module.exports = config;