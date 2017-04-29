var assert = require('assert')
var graphviz = require('./')

assert.equal(
  graphviz({
    content: [
      {
        form: {
          content: [
            {definition: 'IP'}, ' means ',
            {use: 'Copyrights'}, ', ',
            {use: 'Patents'}, ', ',
            {use: 'Trademarks'}, ', ',
            {use: 'Trade Secrets'}, ', and ',
            {use: 'Other IP'}, '.'
          ]
        }
      },
      {
        form: {
          content: [
            {definition: 'Copyrights'},
            ' means ...'
          ]
        }
      },
      {
        form: {
          content: [
            {definition: 'Patents'},
            ' means ...'
          ]
        }
      },
      {
        form: {
          content: [
            {definition: 'Trademarks'},
            ' means ...'
          ]
        }
      },
      {
        form: {
          content: [
            {definition: 'Trade Secrets'},
            ' means ...'
          ]
        }
      },
      {
        form: {
          content: [
            {definition: 'Other IP'},
            ' means intellectual property other than ',
            {use: 'Copyrights'}, ', ',
            {use: 'Patents'}, ', ',
            {use: 'Trademarks'}, ', and ',
            {use: 'Trade Secrets'}, '.'
          ]
        }
      }
    ]
  }),
  [
    'digraph {',
    '"IP" -> "Copyrights";',
    '"IP" -> "Other IP";',
    '"IP" -> "Patents";',
    '"IP" -> "Trade Secrets";',
    '"IP" -> "Trademarks";',
    '"Other IP" -> "Copyrights";',
    '"Other IP" -> "Patents";',
    '"Other IP" -> "Trade Secrets";',
    '"Other IP" -> "Trademarks";',
    '}'
  ].join('\n')
)
