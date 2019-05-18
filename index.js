//global counter of placed stones, determines the color and if there is a draw
let counter = 0;

//the eventlistener for the placement of stones
document.addEventListener('click', function (e) {
  if (e.target.classList[0] == "cell") {
    drop(e.target)
  }
})

//the placement of the stones start here. Element being the clicked on cell
function drop(element) {
  let id = element.id;
  idString = id.toString();
  rowNumber = parseInt(idString[0], 10);
  //user can click on anywhere in a column to drop the stone to the lowest point of the column
  //false is returned if all 6 cells are full
  let selectedCell = findFreeCell(rowNumber);
  //there are no free cells in this column nothing works and the function stops
  if (selectedCell === false) {
    return
  }  
  //the free cells gets the right color
  document.getElementById(selectedCell).classList.add(colorDefiner());
  counter += 1;
  winCheck(selectedCell, rowNumber);
  return
}

//the overarching function that determines the draw or a win
function winCheck(id, rowNumber) {
  if (counter == 42) {
    draw();
    return
  }
  let cell = document.getElementById(id);
  let color = cell.classList[1];
  let wonV = verticalCheck(id, rowNumber, color);
  let wonH = horizontalCheck(id, rowNumber, color);
  let wonDR = diagonalCheckR(id, rowNumber, color);
  let wonDL = diagonalCheckL(id, rowNumber, color);
  if (wonV === true || wonH === true || wonDR === true || wonDL === true) {
    if (color == "green") { greenWins();} else { blueWins();}
  }
  return
}

//goes through all the cells in a column and gives the first free one 51 color 52 color 53 -- free
function findFreeCell(rowNumber) {
  for (let index = 1; index < 7; index++) {
    let cellClass = document.getElementById(rowNumber * 10 + index).classList[1];
    //if there is a free cell
    if (cellClass !== "green" && cellClass !== "blue") {
      let foundCell = rowNumber * 10 + index;
      return foundCell
    }
    //if no free cells
    if (index == 6) {
      return false;
    }
  }
}

//searches if there are any combinations where the color of the set stone won vertically
function verticalCheck(id, rowNumber, color) {
  let verticalColorCount = 1;
  //checks by going up the column
  for (let index = id+1; index < rowNumber*10+7; index++) {
    if (document.getElementById(index).classList[1] == color) {
      verticalColorCount += 1;
      if (verticalColorCount == 4) {
        return true;
      }
      //this happens when its the other color
    } else if (document.getElementById(index).classList[1] == true) {
      verticalColorCount = 0;
    } //if field is empty nothing happens
    else {
      break
    }
  }
  //goes down the column
  for (let index = id - 1; index > rowNumber * 10; index--) {
    if (document.getElementById(index).classList[1] == color) {
      verticalColorCount += 1;
      if (verticalColorCount == 4) {
        return true;
      }
      //this happens when its the other color
    } else if (document.getElementById(index).classList[1] == true) {
      verticalColorCount = 0;
    }
    //if field is empty nothing happens
    else {
      break
    }
  }

  //final return if it wasn't triggered in the loops
  if (verticalColorCount == 4) {
    return true;
  } else {
    return false;
  }
}

//searches if there are any combinations where the color of the set stone won horizontally
function horizontalCheck(id, rowNumber, color) {
  let horizontalColorCount = 1;
  //checks by going up the row
  for (let index = id + 10; index < 77; index += 10) {
    if (document.getElementById(index).classList[1] == color) {
      horizontalColorCount += 1;
      if (horizontalColorCount == 4) {
        return true;
      }
      //this happens when its the other color
    } else if (document.getElementById(index).classList[1] == true) {
      horizontalColorCount = 0;
    } //if field is empty nothing happens
    else {
      break
    }
  }
  //checks by going down the row
  for (let index = id - 10; index > 10; index -= 10) {
    if (document.getElementById(index).classList[1] == color) {
      horizontalColorCount += 1;
      if (horizontalColorCount == 4) {
        return true;
      }
      //this happens when its the other color
    } else if (document.getElementById(index).classList[1] == true) {
       horizontalColorCount = 0;
    } //if field is empty nothing happens
    else {
      break
    }
  }
  //final return if it wasn't triggered in the loops
  if (horizontalColorCount == 4) {
    return true;
  } else {
    return false;
  }
}

//searches if there are any combinations where the color of the set stone won diagonally leaning right
//there will be a second diagonal check for leaning onto left
function diagonalCheckR(id, rowNumber, color) {
  let diagonalColorCount = 1;
  //checks by going up and right the diagonal
  for (let index = id + 11; index < 77; index += 11) {
    if (document.getElementById(index)) {      
      if (document.getElementById(index).classList[1] == color) {
        diagonalColorCount += 1;
        if (diagonalColorCount == 4) {
          return true;
        }
        //this happens when its the other color
      } else if (document.getElementById(index).classList[1] == true) {
        diagonalColorCount = 0;
      } //if field is empty nothing happens
      else {
        break
      }
    }
  }
  //checks by going down and left the diagonal
  for (let index = id - 11; index > 10; index -= 11) {
    if (document.getElementById(index)) {
      if (document.getElementById(index).classList[1] == color) {
        diagonalColorCount += 1;
        if (diagonalColorCount == 4) {
          return true;
        }
        //this happens when its the other color
      } else if (document.getElementById(index).classList[1] == true) {
        diagonalColorCount = 0;
      } //if field is empty nothing happens
      else {
        break
      }
    }
  }

  //final return if it wasn't triggered in the loops
  if (diagonalColorCount == 4) {
    return true;
  } else {
    return false;
  }
}

//searches if there are any combinations where the color of the set stone won diagonally leaning left
function diagonalCheckL(id, rowNumber, color) {
  let diagonalColorCount = 1;
  //checks by going up and right the diagonal
  for (let index = id + 9; index < 77; index += 9) {
    if (document.getElementById(index)) {
      if (document.getElementById(index).classList[1] == color) {
        diagonalColorCount += 1;
        if (diagonalColorCount == 4) {
          return true;
        }
        //this happens when its the other color
      } else if (document.getElementById(index).classList[1] == true) {
        diagonalColorCount = 0;
      } //if field is empty nothing happens
      else {
        break
      }
    }
  }
  //checks by going down and left the diagonal
  for (let index = id - 9; index > 10; index -= 9) {
    if (document.getElementById(index)) {
      if (document.getElementById(index).classList[1] == color) {
        diagonalColorCount += 1;
        if (diagonalColorCount == 4) {
          return true;
        }
        //this happens when its the other color
      } else if (document.getElementById(index).classList[1] == true) {
        diagonalColorCount = 0;
      } //if field is empty nothing happens
      else {
        break
      }
    }
  }
  
  //final return if it wasn't triggered in the loops
  if (diagonalColorCount == 4) {
    return true;
  } else {
    return false;
  }
}

//depending on the counter the color for the tile gets selected
function colorDefiner() {
  if (counter % 2 == 0) {
    return "blue"
  } else {
    return "green"
  }
}

//Displays the draw message, colors all tiles in a grey
function draw() {
  document.getElementById("title").innerHTML = "It is a draw!";
  document.querySelectorAll(".cell").forEach(function (element) {
    element.classList.add("grey");
  });
}

//Displays the win message, colors all tiles in a green
function greenWins() {
  document.getElementById("title").innerHTML = "Green wins!";
  document.querySelectorAll(".cell").forEach(function (element) {
    element.classList.remove("blue");
    element.classList.add("green");
  });
}

//Displays the win message, colors all tiles in a blue
function blueWins() {
  document.getElementById("title").innerHTML = "Blue wins!";
  document.querySelectorAll(".cell").forEach(function (element) {
    element.classList.remove("green");
    element.classList.add("blue");
  });
}