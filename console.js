const readline = require('readline');
const Emitter = require('events');
const commandList = require('./commandList');

const table = require('./table');

const emitter = new Emitter();

const commands = commandList.map(item => item.command);

const rl = readline.createInterface(process.stdin, process.stdout, completer);

function readLine(callback) {
  rl.on('line', callback);
}

function writeLine(value) {
  value = Array.isArray(value) ? table(value) : value;
  process.stdout.write(value + '\n');
}

function proccessInput(string) {
  string = typeof (string) === 'string' && string.trim().length > 0 ?
      string.trim().toLowerCase() :
      false;

  if (string) {
    const [command] = commands.filter(item =>
        string.indexOf(item) > -1);

    if (command) {
      return emitter.emit(command, string);
    } else writeLine('wrong command');
  }
}

function completer(line) {

  const sortSubCommands = [
    'sort importance',
    'sort user',
    'sort date',
  ];

  const hits = line.includes('sort') ?
      sortSubCommands.filter(c => c.startsWith(line)) :
      commands.filter((c) => c.startsWith(line));

  // show all completions if none found
  return [hits.length ? hits : commands, line];
}

function init() {
  console.log('Please, write your command!');
  readLine(proccessInput);
}

function showHelp() {
  let output = '';
  for (item of commandList) {
    output += `\x1b[32m${item.command}\x1b[33m ${item.usage}\x1b[0m: ${item.description}\n`;
  }
  writeLine(output);
}

module.exports = {
  writeLine,
  emitter,
  init,
  showHelp,
};
