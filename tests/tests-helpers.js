function containsAll(needles, haystack) {
   return needles.every(val => haystack.includes(val))
}

module.exports = {containsAll}
