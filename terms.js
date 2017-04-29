module.exports = function (form) {
  return format(analysisOf(form))
}

function analysisOf (form) {
  var analysis = {}
  function recurse (form, within) {
    var definitions = []
    var uses = []
    var children = []
    form.content.forEach(function (element) {
      if (element.definition) {
        definitions.push(element.definition)
      } else if (element.use) {
        uses.push(element.use)
      } else if (element.form) {
        children.push(element.form)
      }
    })
    definitions.concat(uses).forEach(function (term) {
      if (!analysis.hasOwnProperty(term)) {
        analysis[term] = []
      }
    })
    within
      .concat(definitions)
      .forEach(function (inDefinitionOf) {
        uses.forEach(function (used) {
          add(analysis[inDefinitionOf], used)
        })
      })
    children.forEach(function (child) {
      recurse(child, within.concat(definitions))
    })
  }
  recurse(form, [])
  return analysis
}

function add (set, string) {
  if (set.indexOf(string) === -1) {
    set.push(string)
    set.sort()
  }
}

function format (analysis) {
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
