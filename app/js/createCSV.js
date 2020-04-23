/**
 * Gets test data
 * converts the json into csv and returns out
 * @param {*} info - object of user data
 * @param {*} userId - id of user in database
 * @param {*} userName  - name of user in database
 * @param {*} userPercentage -user percentage score on taken test
 */

function createCSV(info, userId, userName, userPercentage) {
    console.log(userPercentage);
    let csv = 'Name,Score,%,Answers\n';
    info.data.forEach(function(row) {
        if (row.id == userId) {
        row.answers = row.answers.replace(/\\/g,"");
            csv += `${userName}, ${row.score}, ${userPercentage}, ${row.answers}`;
            csv += "\n";
        }
    });
    return csv
}