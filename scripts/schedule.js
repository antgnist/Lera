go();


async function go() {
    let tableFromBase = await doFetchTable();
    doFillTable(tableFromBase);
}



async function doFetchTable() {
  let url = 'https://script.google.com/macros/s/AKfycbwfnP4rtr-cuCB1i-169F02OB4ZHFyicCYIx6sC0AuXOnvao73W3xyPJLsuPvkv82ji/exec';

  try {
    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
      let json = await response.json();
    //  alert(json);
      return json;  
    }  
  } catch (error) {
    console.log('Ошибка при запросе fetch:', error);
  }

}



function doFillTable(base) {


    let table = document.querySelector('.schedule');
    let tableBody = table.querySelector('.schedule__body');
    let tableHeaderRow = table.querySelector('.schedule__header-row');

  //  let weekArray = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
    let date = new Date();
    let weekDay = date.getDay();
    if (weekDay === 0) {
      weekDay = 7
    }

    let formatter = new Intl.DateTimeFormat("ru", {
      timeZone:"Europe/Moscow",
      month: "numeric",
      day: "numeric"
    });
    
    let headCell = document.createElement('div');
    headCell.classList.add('schedule__cell')
    tableHeaderRow.append(headCell);

    let counterDate = date;
    for (let i = weekDay; i < weekDay+7; i++) {
      let clonHeadCell = headCell.cloneNode(true);
      clonHeadCell.append(formatter.format(counterDate));
      counterDate.setDate(counterDate.getDate() + 1);
      tableHeaderRow.append(clonHeadCell);    
    }


    for (let i = 0; i < base.length; i++) {

        let row = document.createElement('div');
        row.classList.add('schedule__row');
        tableBody.append(row);

        let cellNode = document.createElement('div');
        cellNode.classList.add('schedule__cell');

        let timeCell = cellNode.cloneNode(true);
        timeCell.append(base[i][0]);
        row.append(timeCell);


        for (let j = weekDay; j < weekDay+7; j++) {
          
            let cell = cellNode.cloneNode(true);
            
            switch (base[i][j]) {
                case 'уточняйте':
                    cell.classList.add('schedule__cell--question');
                 //   cell.style.backgroundColor = '#a9d0fe';
                 //   cell.append('уточнить');        
                    break;
            
                case 'свободно':
                    cell.classList.add('schedule__cell--free');
                  //  cell.style.backgroundColor = '#a9ecd0';
                  //  cell.style.color = 'white';
                  //  cell.append('свободно'); 
                    break;
                    
                case 'занято':
                    cell.classList.add('schedule__cell--occupied');
                   // cell.style.backgroundColor = 'red';
                   // cell.style.color = 'white';
                  // cell.style.background = 'repeating-linear-gradient(-45deg,#c2c2c2,#c2c2c2 0.15em,transparent 0,transparent 0.505em)';
                  //  cell.style.backgroundColor = '#e8e8e8';
                   // cell.append(''); 
                    break;

                default:
                    cell.append(base[i][j]); 
                    break;

            }

            row.append(cell);
        }
        
    }

}



