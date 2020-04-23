function download_csv(info, userId) {
    var csv = 'Name,Title\n';
    info.data.forEach(function(row) {
        if (row.id == userId) {
        console.log(row)
            csv += `${row.id}, ${row.answers}`;
            csv += "\n";
        }
    });

    return csv
 
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
}


  
function createCSV() {

    var data = getData("result").then((data) => {
        return data
    })
        .then((data) => {

            var result = data

        

        download_csv(result, 2) 
    })
}

     
