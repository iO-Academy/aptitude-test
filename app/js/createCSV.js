/**
 * 
 * @param {info} json with stuff in 
 * @param {userId} is userId 
 * @param {*} userName 
 * @param {*} userPercentage 
 */

function createCSV(info, userId, userName, userPercentage) {
    var csv = 'Name,Score,%,Answers\n';
    info.data.forEach(function(row) {
        if (row.id == userId) {
        row.answers = row.answers.replace('/','');
            csv += `${userName}, ${row.score}, ${userPercentage}, ${row.answers}`;
            csv += "\n";
        }
    });

    return csv
 
}