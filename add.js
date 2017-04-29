module.exports = function add (set, string) {
  if (set.indexOf(string) === -1) {
    set.push(string)
    set.sort()
  }
}
