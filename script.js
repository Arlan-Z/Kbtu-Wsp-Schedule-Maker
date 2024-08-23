const nameInput = document.getElementById("name");
const timeStart = document.getElementById("start");
const timeEnd = document.getElementById("end");
const day = document.getElementById("days");
const table = document.getElementById("schedule");

let data = {};
let weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function createDis(){
    for(i = timeStart.value; i < timeEnd.value; i++){
        if (!data[i]) {
            data[i] = {}; 
        }
        data[i][day.value] = nameInput.value;
    }

    updateTable();
}

function destroyDis(e) {
    let box = e.target;
    let rowKey = box.dataset.row;
    let cellKey = box.dataset.cell;

    // Удаление данных из объекта
    if (data[rowKey]) {
        delete data[rowKey][cellKey];
        // Удалить строку, если она пустая
        if (Object.keys(data[rowKey]).length === 0) {
            delete data[rowKey];
        }
    }

    // Удаление элемента из DOM
    box.remove();
    updateTable();
}

function updateTable(){
    let week = new Set();

    for (let rowKey in data) { // Первый цикл по строкам
        if (data.hasOwnProperty(rowKey)) {
            for (let cellKey in data[rowKey]) { // Вложенный цикл по ячейкам в строке
                if (data[rowKey].hasOwnProperty(cellKey)) {
                    week.add(cellKey);
                    let value = data[rowKey][cellKey];
                    
                    let box = document.createElement("div");
                    box.dataset.row = rowKey;
                    box.dataset.cell = cellKey;

                    box.classList.add("box");
                    box.addEventListener("click", destroyDis);
                    box.innerHTML = value;
                    table.rows[rowKey].cells[cellKey].innerHTML = "";
                    table.rows[rowKey].cells[cellKey].appendChild(box);
                }
            }
        }
    }

    console.log(week.size);
    for(i = 1; i <= 7; i++){
        if(week.size == 0) break;

        let elems = document.querySelectorAll(`.${weekDays[i - 1]}`);
        if(week.has(i.toString())){
            elems.forEach((el) => {
                el.style.display = "table-cell";
            });
        }
        else{
            elems.forEach((el) => {
                el.style.display = "none"
            });
        }
    }
}