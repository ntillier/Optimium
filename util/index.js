const { escapeMarkdown } = require("discord.js");

exports.unFormat = (str) => {
    return escapeMarkdown(str);
    return str.replace(/([\*_~`])/g, `\\$1`);
}