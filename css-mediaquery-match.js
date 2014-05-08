/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

'use strict';

exports.match = matchQuery;
exports.parse = parseQuery;

// -----------------------------------------------------------------------------

var RE_MEDIA_QUERY   = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,
    RE_MQ_EXPRESSION = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,
    RE_MQ_FEATURE    = /^(?:(min|max)-)?(.+)/;

function matchQuery(mediaQuery, values) {
  return parseQuery(mediaQuery).some(function (query) {
    var inverse = query.inverse;

    // Either the parsed or specified `type` is "all", or the types must be
    // equal for a match.
    var typeMatch = query.type === 'all' || values.type === query.type;

    // Quit early when `type` doesn't match, but take "not" into account.
    if ((typeMatch && inverse) || !(typeMatch || inverse)) {
      return false;
    }

    var expressionsMatch = query.expressions.every(function (expression) {
      var feature  = expression.feature,
          modifier = expression.modifier,
          expValue = expression.value,
          value    = values[feature];

      // Missing or falsy values don't match.
      if (!value) {
        return false;
      } else if (value === 'any') {
        return true;
      }

      switch (feature) {
        case 'orientation':
          return value.toLowerCase() === expValue.toLowerCase();
        case 'width':
        case 'height':
        case 'device-width':
        case 'device-height':
          value = parseFloat(value);
          expValue = parseFloat(expValue);
          break;
      }

      switch (modifier) {
        case 'min': return value >= expValue;
        case 'max': return value <= expValue;
        default   : return value === expValue;
      }
    });

    return (expressionsMatch && !inverse) || (!expressionsMatch && inverse);
  });
}

function parseQuery(mediaQuery) {
  return mediaQuery.split(',').map(function (query) {
    query = query.trim();

    var captures    = query.match(RE_MEDIA_QUERY),
        modifier    = captures[1],
        type        = captures[2],
        expressions = captures[3] || '',
        parsed      = {};

    parsed.inverse = !!modifier && modifier.toLowerCase() === 'not';
    parsed.type    = type ? type.toLowerCase() : 'all';

    // Split expressions into a list.
    expressions = expressions.match(/\([^\)]+\)/g) || [];

    parsed.expressions = expressions.map(function (expression) {
      var captures = expression.match(RE_MQ_EXPRESSION),
          feature  = captures[1].toLowerCase().match(RE_MQ_FEATURE);

      return {
        modifier: feature[1],
        feature : feature[2],
        value   : captures[2]
      };
    });

    return parsed;
  });
}
