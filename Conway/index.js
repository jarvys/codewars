function copy(cells) {
    var result = [];
    cells.forEach(function(row) {
        result.push([].concat(row));
    });

    return result;
}

function extend(cells) {
    var cols = cells[0].length;
    var newRow = [];
    for (var i = 0; i < cols; i++) {
        newRow.push(0);
    }
    cells.push(newRow);

    cells.forEach(function(cell) {
        cell.push(0);
    });
}

function gen(cells, generations) {

}

function getGeneration(cells, generations) {
}