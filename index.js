const cons = require('./console');
const getFilesAndNames = require('./fileSystem');

const {
  getData,
  showAll,
  filteredImportant,
  filteredByUser,
  filteredByDate,
  sortedBy,
} = require('./data');


// путь и кодировка по-умолчанию
const config = require('./config');

// получение пути и кодировки из аргументов --path=../app --encoding=utf-8
const args = process.argv.slice(2);
args.map(arg => {
  let [key, value] = arg.split('=');
  key = key.replace('--', '');
  config[key] = value;
});

cons.init();

const files = getFilesAndNames(config.path, config.encoding);
getData(files);



cons.emitter.on('exit', () => process.exit(0));

cons.emitter.on('help', cons.showHelp);

cons.emitter.on('show', showAll);

cons.emitter.on('important', filteredImportant);

cons.emitter.on('user', param => filteredByUser(param));

cons.emitter.on('date', param => filteredByDate(param));

cons.emitter.on('sort', param => sortedBy(param));



