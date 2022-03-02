/**
 * @template {{ date: string }} T
 * @param {T[]} arr
 * @returns {T[]}
 */
exports.sortByDate = function (arr) {
  return arr.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
};
