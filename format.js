module.exports = function format (analysis) {
  return [
    'digraph {',
    Object.keys(analysis)
      .filter(function notEmpty (from) {
        return analysis[from].length !== 0
      })
      .map(function edges (from) {
        return analysis[from]
          .map(function (to) {
            return (
              JSON.stringify(from) +
              ' -> ' + JSON.stringify(to) + ';'
            )
          })
          .join('\n')
      })
      .join('\n'),
    '}'
  ].join('\n')
}
