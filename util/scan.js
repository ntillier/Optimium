const Filter = require("badwords-filter");
const config = require("../config");
const { Settings } = require("../database");

Settings.get(config.settings.keys.badWords)
  .then(({ words }) => {
    module.exports = new Filter({
      list: words.length === 0 ? ['dwdhjwdwhdkwjhdjwhdwhjdwldswhgswhjswgshwgshg'] : words,
      cleanWith: '*',
      useRegex: false,
    });
  });

module.exports = new Filter({ cleanWith: '*', useRegex: false, list: ['dwdhkwdgwhdgwhdgwdwdbvhjwvkwdd'] });