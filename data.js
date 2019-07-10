const {getArgs, sortByProperty} = require('./utils');
const {writeLine} = require('./console');

const todoRegexp = /(?:\s*)(\/\/\s?TODO\s?:?\s?)(?:\s?(?<user>\w*)\s?;)?(?:\s?(?<date>\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]))\s?;)?(?:\s+(?<comment>.+)$)/mgi;

const data = [];

function getData(files = []) {
  for (const file of files) {
    while (true) {
      const matches = todoRegexp.exec(file.content);
      if (matches === null) break;

      const {user = '', date = '', comment = ''} = matches.groups;
      const importance = (comment.match(/!/g) || []).length;
      let todo = {
        user, date, comment, importance, fileName: file.name,
      };
      data.push(todo);
    }
  }
  return true;
}

function showAll() {
  return writeLine(data);
}

function filteredImportant() {
  const important = data.filter(todo => todo.importance > 0);
  return writeLine(important);
}

function filteredByUser(string) {
  const user = getArgs(string).toLowerCase();
  if (user) {
    const filtered = data.filter(
        todo => todo.user.toLowerCase().startsWith(user));
    writeLine(filtered);
    return;
  }
  writeLine('Insufficient command arguments\nUsage: user {username}');
}

function filteredByDate(string) {
  const date = Date.parse(getArgs(string));
  if (date) {
    const filtered = data.filter(todo =>
        Date.parse(todo.date) >= date);
    writeLine(filtered);
    return;
  }
  writeLine(
      'Insufficient command arguments or wrong date\nUsage: date {yyyy[-mm-dd]}');
}

function sortedBy(string) {
  const param = getArgs(string);
  if (param) {
    sorted = sortByProperty(data, param);
    writeLine(sorted);
    return;
  }
  writeLine(
      'Insufficient command arguments\nUsage: sort {importance | user | date}');
}

module.exports = {
  getData,
  showAll,
  filteredImportant,
  filteredByUser,
  filteredByDate,
  sortedBy,
};