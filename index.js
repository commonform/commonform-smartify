module.exports = function recurse (form) {
  var content = form.content
  content.forEach(function (element, index) {
    if (typeof element === 'string') {
      content[index] = replacePunctuation(element)
    } else if (element.form) {
      if (element.heading) {
        element.heading = replacePunctuation(element.heading)
      }
      recurse(element.form)
    } else if (element.definition) {
      element.definition = replacePunctuation(element.definition)
    } else if (element.use) {
      element.use = replacePunctuation(element.use)
    } else if (element.reference) {
      element.reference = replacePunctuation(element.reference)
    }
  })
  return form
}

function replacePunctuation (string) {
  var LEFT_SINGLE = '‘'
  var RIGHT_SINGLE = '’'
  var LEFT_DOUBLE = '“'
  var RIGHT_DOUBLE = '”'
  return string

    // Quotes
    .replace(/ '/g, ' ' + LEFT_SINGLE)
    .replace(/' /g, RIGHT_SINGLE + ' ')
    .replace(/'/g, RIGHT_SINGLE)
    .replace(/ "/g, ' ' + LEFT_DOUBLE)
    .replace(/" /g, RIGHT_DOUBLE + ' ')
    .replace(/"([.?!])/g, RIGHT_DOUBLE + '$1')
    .replace(/"$/g, RIGHT_DOUBLE)
    .replace(/"/g, LEFT_DOUBLE)

    // Dashes
    .replace(/---/g, '—')
    .replace(/--/g, '–')

    // Ellipses
    .replace(/\.\.\./g, '…')
}
