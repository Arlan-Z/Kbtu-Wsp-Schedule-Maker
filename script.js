const nameInput = document.getElementById("name");
const timeStart = document.getElementById("start");
const timeEnd = document.getElementById("end");
const day = document.getElementById("days");
const table = document.getElementById("schedule");


function createDis(){
    console.log(nameInput.value + " " + timeStart.value + " " + timeEnd.value + " " + day.value)

    let box = document.createElement("div");
    box.innerHTML = nameInput.value;
    // table.rows[]

    updateTable();
}

function destroyDis(e){
    e.target.remove();
}

function updateTable(){

}