var Filter = require('bad-words');
const config = require("../config");
const { Settings } = require("../database");

const filter = new Filter({
  placeHolder: config.filter.placeholder
});

Settings.get(config.settings.keys.badWords)
  .then(({ words }) => {
    filter.addWords(...words);
  });

module.exports = filter;