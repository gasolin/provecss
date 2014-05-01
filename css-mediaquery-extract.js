/**
 * Module dependencies.
 */

var mediaMatch = require('./css-mediaquery-match.js');

module.exports = function(opt) {
  return function(style) {
    var rules = style.rules;
    var matchRules = [];

    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      var query = rule.media;

      if (!query) {
        matchRules.push(rule);
        continue;
      } else {
        var match = mediaMatch.match(query, opt.deviceOptions);
        if (match && !opt.extractQuery) {
          matchRules.push(rule);
        } else if (match && opt.extractQuery) {
          for (var j = 0, len = rule.rules.length; j < len; j++) {
            matchRules.push(rule.rules[j]);
          }
        }
      }
    }
    style.rules = matchRules;
  }
}
