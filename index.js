let counter = 0;

document.addEventListener('click', function (e) {
  if (e.target.classList[0] == "cell") {
    drop(e.target)
  }
})

function drop(element) {
  let id = element.id;
  idString = id.toString();
  rowNumber = parseInt(idString[0], 10);

  let selectedCell = findFreeCell(rowNumber);
  if (selectedCell === false) {
    return
  }  
  document.getElementById(selectedCell).classList.add(colorCheck());
  counter += 1;
  winCheck()
}

function winCheck() {
  if (counter == 42) {
    draw();
  }
}

function findFreeCell(rowNumber) {
  for (let index = 1; index < 7; index++) {
    let cellClass = document.getElementById(rowNumber * 10 + index).classList[1];

    if (cellClass !== "green" && cellClass !== "blue") {
      let foundCell = rowNumber * 10 + index;
      return foundCell
    }
    if (index == 6) {
      return false;
    }
  }
}

function colorCheck() {
  if (counter % 2 == 0) {
    return "blue"
  } else {
    return "green"
  }
}

function draw() {
  document.getElementById("title").innerHTML = "It is a draw!";
  document.querySelectorAll(".cell").forEach(function (element) {
    console.log(element);
    element.classList.add("grey");
  });
}

function greenWins() {
  document.getElementById("title").innerHTML = "Green wins!";
  document.querySelectorAll(".cell").forEach(function (element) {
    console.log(element);
    element.classList.remove("blue");
    element.classList.add("green");
  });
}

function blueWins() {
  document.getElementById("title").innerHTML = "Blue wins!";
  document.querySelectorAll(".cell").forEach(function (element) {
    console.log(element);
    element.classList.remove("green");
    element.classList.add("blue");
  });
}