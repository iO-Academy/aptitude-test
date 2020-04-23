function createCSV(info, userId) {
    var csv = 'Name,Title\n';
    info.data.forEach(function(row) {
        if (row.id == userId) {
        console.log(row)
            csv += `${row.id}, ${row.answers}`;
            csv += "\n";
        }
    });

    return csv
 
}