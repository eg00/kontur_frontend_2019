function getArgs(string){
  return string.replace(/^\w+/, '').trim() || false;
}

function sortByProperty(array, propertyName) {
  return array.sort(function(a, b) {
    if (a[propertyName] > b[propertyName])
      return -1;
    if (a[propertyName] < b[propertyName])
      return 1;
    return 0;
  });
}

module.exports = {
  getArgs,
  sortByProperty
};