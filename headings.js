var format = require('./format')

module.exports = function (form) {
  return format(analysisOf(form))
}

function analysisOf (form) {
  var analysis = {}
  function recurse (form, underHeadings) {
    form.content.forEach(function (element) {
      if (element.reference && underHeadings.length !== 0) {
        var under = underHeadings[underHeadings.length - 1]
        if (!analysis.hasOwnProperty(under)) {
          analysis[under] = []
        }
        add(analysis[under], element.reference)
      } else if (element.form) {
        recurse(
          element.form,
          element.hasOwnProperty('heading')
            ? underHeadings.concat(element.heading)
            : underHeadings
        )
      }
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
