document.body.onload = createTables;
let coordinates30 = [];

function createTables() {
	createCoordinates();
	createBigTable();
	createSmallTable();
	setDefaultValues();
}

function createBigTable() {
	var body = document.getElementsByTagName("body")[0];
	var tbl = document.createElement("table");
  	var tblBody = document.createElement("tbody");
  	tbl.setAttribute("class", "table1");
  	tbl.setAttribute("id", "bigTable");
 
  	for (var i = 0; i < 9; ++i) {
	    var row = document.createElement("tr");
	  	rowStyleBigTable(row, i);
	    for (var j = 0; j < 9; ++j) {
	      var cell = document.createElement("td");
	      var cellText = document.createTextNode("");
	      cell.setAttribute("id", "C" + i + j);
	      cell.setAttribute("class", "cellBT");
	      cell.onclick = function() { getCellIdAndModifyCell(this.id) };
	      columnStyleBigTable(cell, j);
	      cell.appendChild(cellText);
	      row.appendChild(cell);
	    }
	    tblBody.appendChild(row);
  	}
	tbl.appendChild(tblBody);
	body.appendChild(tbl);
	tbl.setAttribute("border", "2");
	body.appendChild(document.createElement("br"));
}

function createSmallTable() {
	var body = document.getElementsByTagName("body")[0];
	var smallTbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	var row = document.createElement("tr");
	smallTbl.setAttribute("class", "table2");

	for (var i = 0; i < 9; ++i) {
		var smallCell = document.createElement("td");
		smallCell.setAttribute("id", "S" + i);
		smallCell.setAttribute("class", "cellST");
		var cellText = document.createTextNode("" + (i + 1));
		smallCell.onclick = function() {setUserCellValue(this.id)};
		smallCell.appendChild(cellText);
		row.appendChild(smallCell);
	}
	tblBody.appendChild(row);
	smallTbl.appendChild(tblBody);
	body.appendChild(smallTbl);
}

function rowStyleBigTable(row, i) {
	if (i == 2 || i == 5 || i == 8) {
    	row.style.borderBottom = "2px solid blue";
    } else if (i == 0) {
    	row.style.borderTop = "2px solid blue";
    }
}

function columnStyleBigTable(cell, j) {
	if (j == 3 || j == 6 || j == 0) {
		cell.style.borderLeft = "2px solid blue";
	} else if (j == 8) {
		cell.style.borderRight = "2px solid blue";
	}
}

function setOnClickColor(cell) {
	if (cell.style.backgroundColor != "rgb(204, 242, 255)") {
		cell.style.backgroundColor = "yellow";
	}
}

function setAfterClickColor(cell) {
	if (cell != null && cell.style.backgroundColor != "rgb(204, 242, 255)"
		&& cell.style.backgroundColor != "crimson") {
		cell.style.backgroundColor = "white"; 
	}
}

var cell;

function getCellIdAndModifyCell(val) {
	setAfterClickColor(cell);
	cell = document.getElementById(val);
	if (cell.innerHTML != "") {
		cell.innerHTML = "";
	}
	setOnClickColor(cell);
}

function setUserCellValue(idCell) {
	var smallCell = document.getElementById(idCell);
	var number = smallCell.innerHTML;
	var bigTable = document.getElementById("bigTable");
	var rowTbl = parseInt((cell.id).charAt(1));
	var colTbl = parseInt((cell.id).charAt(2));
	checkUserInput(cell, rowTbl, colTbl, number, bigTable);

	if (cell.style.backgroundColor != "rgb(204, 242, 255)") {
		cell.innerHTML = number;
	}
}

function checkUserInput(cell, rowTbl, colTbl, number, bigTable) {
	var checkRow = verifyRow(rowTbl, number, bigTable);
	var checkCol = verifyColumn(colTbl, number, bigTable);
	var checkBox = verifyBox(rowTbl, colTbl, number, bigTable);

	if (checkRow == 0 && checkCol == 0 && checkBox == 0) {
		cell.style.backgroundColor = "chartreuse";
	} else {
		cell.style.backgroundColor = "crimson";
	}
}

//COORDINATES OF DEFAULT NUMBERS

function createCoordinates() {
	while (coordinates30.length < 20) {
		addNumber();
	}
}

function addNumber() {
	var element = createNumber();
	while (coordinates30.indexOf(element) != -1) {
		element = createNumber();
	}
	coordinates30.push(element);
}

function createNumber() {
	var digit1 = getRandomNumber(0, 8);
	var digit2 = getRandomNumber(0, 8);
	var position = "C" + digit1 + digit2;
	return position;
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
} 

//CREATE DEFAULT NUMBERS

function setDefaultValues() {
	for (var i = 0; i < 20; ++i) {
		var element = coordinates30[i];
		var row = parseInt(element.charAt(1));
		var column = parseInt(element.charAt(2));
		var bigTable = document.getElementById("bigTable");

		var number = getRandomNumber(1, 9);
		var correctNumber = 1;
		while (correctNumber == 1) {
			correctNumber = 0;
			var checkPoint1 = verifyRow(row, number, bigTable);
			var checkPoint2 = verifyColumn(column, number, bigTable);
			var checkPoint3 = verifyBox(row, column, number, bigTable);

			if (checkPoint1 == 1 || checkPoint2 == 1 || checkPoint3 == 1) {
				number = getRandomNumber(1, 9);
				correctNumber = 1;
			}
		}
		var cell1 = document.getElementById(element);
		cell1.innerHTML = number;
		cell1.style.backgroundColor = "rgb(204, 242, 255)";
	}
}

var boxRow, boxCol;

function findBox(row, column) {
	for (var k = 0; k <= 6; k += 3) {
		if (row >= k) {
			boxRow = k;
		}
		if (column >= k) {
			boxCol = k;
		}
	}
}

function verifyBox(row, column, number, bigTable) {
	findBox(row, column);
	var trueVal = 0;
	for (var f = boxRow; f < boxRow + 3; ++f) {
		for (var t = boxCol; t < boxCol + 3; ++t) {
			var currentCell = bigTable.rows[f].cells[t];
			if (currentCell.innerHTML != "") {
				if (currentCell.innerHTML == number) {
					trueVal = 1;
					break;
				}
			}
		}
	}
	return trueVal;	
}

function verifyRow(row, number, bigTable) {
	var trueVal = 0;
	for (var g = 0; g < 9; ++g) {
		var currentCellRow = bigTable.rows[row].cells[g];
		if (currentCellRow.innerHTML != "") {
			if (currentCellRow.innerHTML == number) {
				trueVal = 1;
				break;
			}
		}
	}
	return trueVal;
}

function verifyColumn(column, number, bigTable) {
	var trueVal = 0;
	for (var h = 0; h < 9; ++h) {
		var currentCellColumn = bigTable.rows[h].cells[column];
		if (currentCellColumn.innerHTML != "") {
			if (currentCellColumn.innerHTML == number) {
				trueVal = 1;
				break;
			}
		}
	}
	return trueVal;
}
