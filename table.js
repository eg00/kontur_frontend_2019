// Отступ от разделителей - два пробела
const PAD = '  ';

let columns = {};

function formatCell(value, ColumnSize) {
  const ENDING = '...';
  let repeats = ColumnSize - value.length;
  if (repeats < 0) {
    value = value.substring(0, ColumnSize - ENDING.length) + ENDING;
    repeats = 0;
  }
  const text = value + ' '.repeat(repeats);
  return PAD + text + PAD;
}

function getHeader(data) {

  let tableHeader = '';

  for (const column in columns) {

    // Заголовок + все значения столбца
    const values = [column, ...data.map(x => x[column] || '')];

    // Самое длинное значение в столбце
    const maxValueSize = values.reduce((a, b) => a > b.length ? a : b.length,
        0);

    // Ширина столбца = самому длинному значению, если оно меньше заданного
    if (columns[column] > maxValueSize) columns[column] = maxValueSize;

    if (column !== '!') tableHeader += '|';

    tableHeader += formatCell(column, columns[column]);
  }
  return tableHeader + '\n' + printLine();
}

function getBody(data) {
  if (data.length) {
    let tableData = '';
    data.forEach(row => {
      Object.keys(row).forEach((key, index) => {
        if (index === 0) {
          const importance = row['importance'] > 0 ? '!' : ' ';
          tableData += formatCell(importance, 1);
        }

        if (columns.hasOwnProperty(key)) {
          tableData += '|';
          tableData += formatCell(row[key], columns[key]);
        }
      });
      tableData += '\n';
    });
    tableData += printLine();
    return tableData;
  }
  return false;
}

function printLine() {
  // Количество разделителей ячеек
  const delimiters = Object.keys(columns).length - 1;
  // Все самые длинные значения в столбцах + 4 пробела отступов на каждый столбец + разделители
  const length =
      Object.keys(columns).
          reduce((sum, key) => sum + columns[key] + (PAD.length * 2), 0) +
      delimiters;
  return '-'.repeat(length || 1) + '\n';

}

function table(data = []) {
  // Названия колонок и их максимальная ширина,
  // не считая отступ до вертикальных черт: 1, 10, 10, 50, 15 соответственно
  columns = {
    '!': 1,
    'user': 10,
    'date': 10,
    'comment': 50,
    'fileName': 15,
  };
  if (getBody(data)) {
    return getHeader(data) + getBody(data);
  }
  return getHeader(data);

}

module.exports = table;
