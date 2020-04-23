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


  
function getInfoForCSV() {

    var data = getData("result").then((data) => {
        return data
    })
        .then((data) => {

            var result = data

            createCSV(result, 2) 
    })
}

     
