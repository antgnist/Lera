export { doUpdateTable };

function doUpdateTable() {
  let table = document.querySelector('.schedule');
  let targetWeek = 0;

  let tableFromBase;
  doFetchTable().then((result) => {
    tableFromBase = result;
    doFillTable(table, tableFromBase, targetWeek);
  });

  table.parentNode.addEventListener('click', (event) => {
    let target = event.target;

    if (target.closest('.schedule__left')) {
      if (targetWeek > 0) {
        targetWeek = targetWeek - 7;
        doFillTable(table, tableFromBase, targetWeek);
      }
      return;
    }

    if (target.closest('.schedule__right')) {
      if (targetWeek < 7) {
        targetWeek = targetWeek + 7;
        doFillTable(table, tableFromBase, targetWeek);
      }
      return;
    }
  });
}

async function doFetchTable() {
  let url =
    'https://script.google.com/macros/s/AKfycbwfnP4rtr-cuCB1i-169F02OB4ZHFyicCYIx6sC0AuXOnvao73W3xyPJLsuPvkv82ji/exec';

  try {
    let response = await fetch(url);

    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      let json = await response.json();
      //  alert(json);
      return json;
    }
  } catch (error) {
    console.log('Ошибка при запросе fetch:', error);
  }
}

function doFillTable(table, base, targetWeek) {
  let tableHeaderRow = table.querySelector('.schedule__header-row');
  let tableBody = table.querySelector('.schedule__body');

  tableHeaderRow.querySelectorAll('*').forEach((child) => child.remove());

  tableBody.querySelectorAll('*').forEach((child) => child.remove());

  let weekArray = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  let weekArrayCopy = weekArray.slice();
  let date = new Date();

  let weekDay = date.getDay();
  if (weekDay === 0) {
    weekDay = 7;
  }

  let formatter = new Intl.DateTimeFormat('ru', {
    timeZone: 'Europe/Moscow',
    month: 'numeric',
    day: 'numeric',
  });

  let headCell = document.createElement('div');
  headCell.classList.add('schedule__cell');
  tableHeaderRow.append(headCell); //---добавили первую ячейку хедера без ничего

  let counterDate = date;

  if (targetWeek === 0) {
    counterDate.setDate(counterDate.getDate() - (weekDay - 1));

    for (let i = 1; i < weekDay; i++) {
      let clonHeadCell = headCell.cloneNode(true);
      clonHeadCell.insertAdjacentHTML(
        'beforeend',
        `<span>${formatter.format(
          counterDate
        )}</span><span>${weekArrayCopy.shift()}</span>`
      );
      counterDate.setDate(counterDate.getDate() + 1);
      tableHeaderRow.append(clonHeadCell);
    }

    let clonHeadCell = headCell.cloneNode(true);
    clonHeadCell.classList.add('schedule__cell--today');
    clonHeadCell.insertAdjacentHTML(
      'beforeend',
      `<span>${formatter.format(
        counterDate
      )}</span><span>${weekArrayCopy.shift()}</span>`
    );
    counterDate.setDate(counterDate.getDate() + 1);
    tableHeaderRow.append(clonHeadCell);

    //-----до сегодня заполнили дни в первой строчке таблицы

    for (let i = weekDay; i < 7; i++) {
      let clonHeadCell = headCell.cloneNode(true);
      clonHeadCell.insertAdjacentHTML(
        'beforeend',
        `<span>${formatter.format(
          counterDate
        )}</span><span>${weekArrayCopy.shift()}</span>`
      );
      counterDate.setDate(counterDate.getDate() + 1);
      tableHeaderRow.append(clonHeadCell);
    }
  } else {
    //-----Если неделя не текущая
    counterDate.setDate(counterDate.getDate() - (weekDay - 1) + targetWeek);

    for (let i = 1; i < 8; i++) {
      let clonHeadCell = headCell.cloneNode(true);
      clonHeadCell.insertAdjacentHTML(
        'beforeend',
        `<span>${formatter.format(
          counterDate
        )}</span><span>${weekArrayCopy.shift()}</span>`
      );
      counterDate.setDate(counterDate.getDate() + 1);
      tableHeaderRow.append(clonHeadCell);
    }
  }

  //-----нижние строчки таблицы (до сегодня серые)

  for (let i = 0; i < base.length; i++) {
    let row = document.createElement('div');
    row.classList.add('schedule__row');
    tableBody.append(row);

    let cellNode = document.createElement('div');
    cellNode.classList.add('schedule__cell');

    let timeCell = cellNode.cloneNode(true);
    timeCell.append(base[i][0]);
    row.append(timeCell);

    if (targetWeek === 0) {
      //-----до сегодня заполнили всё занятыми

      for (let j = 1; j < weekDay; j++) {
        let cell = cellNode.cloneNode(true);
        cell.classList.add('schedule__cell--occupied');
        row.append(cell);
      }

      // ----- после сегодня сверяем ячейки

      for (let j = weekDay; j < 1 + 7; j++) {
        let cell = cellNode.cloneNode(true);

        switch (base[i][j]) {
          case 'уточняйте':
            cell.classList.add('schedule__cell--question');
            cell.classList.add('modal-enter');
            cell.dataset.modal = 'template-callback';
            break;
          case 'свободно':
            cell.classList.add('schedule__cell--free');
            cell.classList.add('modal-enter');
            cell.dataset.modal = 'template-callback';
            break;
          case 'занято':
            cell.classList.add('schedule__cell--occupied');
            break;
          default:
            cell.append(base[i][j]);
            break;
        }

        row.append(cell);
      }
    } else {
      for (let j = 1 + targetWeek; j < 8 + targetWeek; j++) {
        let cell = cellNode.cloneNode(true);

        switch (base[i][j]) {
          case 'уточняйте':
            cell.classList.add('schedule__cell--question');
            cell.classList.add('modal-enter');
            cell.dataset.modal = 'template-callback';
            break;
          case 'свободно':
            cell.classList.add('schedule__cell--free');
            cell.classList.add('modal-enter');
            cell.dataset.modal = 'template-callback';
            break;
          case 'занято':
            cell.classList.add('schedule__cell--occupied');
            break;
          default:
            cell.append(base[i][j]);
            break;
        }

        row.append(cell);
      }
    }
  }
}
