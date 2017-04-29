var add = require('./add')
var format = require('./format')

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
