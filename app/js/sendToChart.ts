/**
 * function to generate the data object for the chart displayed on the front end.
 * @returns the data object for graph.js
 */
import {BaseUser} from "./interfaces/User";

async function sendToChart(users: Array<BaseUser>) {
    let labels = await generateLabels(users);
    let dubiousGrade = await generateDataset("Under 70%", labels, users, 0, 70, "rgba(255, 51, 102, 1)");
    let passingGrade = await generateDataset("70% to 97%", labels, users,  70, 97, "rgba(95, 255, 180, 1)");
    let topGrade = await generateDataset("97% and above", labels, users, 97, 101, "rgba(116, 61, 251, 1)");

    let dataForChart = {
        labels: labels,
        datasets: [dubiousGrade, passingGrade, topGrade]
    }

    return dataForChart;
};

/**
 * function to generate a dataset to be inserted into the chart's data object
 * 
 * @param {datasetLabel} string the label for the dataset
 * @param {testLabels} Array the array of strings containing the names of the tests
 * @param {users} Object the object containing information about all current users. Comes from createUsersObject
 * @param {minPercentage} number the least percentage to be included in the range, inclusive
 * @param {maxPercentage} number the greatest percentage to be included in the range, exclusive
 * @param {color} string the colour code for entries in this dataset
 * 
 * @return Object a dataset object containing: A label, an array of data, and an array of background
 *                colors for that data (all set to the same value, passed in as color) 
 */
async function generateDataset(
    datasetLabel: string,
    testLabels: Array<string>,
    users: Array<BaseUser>,
    minPercentage: number,
    maxPercentage: number,
    color: string
): Promise<Object> {

    let dataset = {
        data: [],
        label: datasetLabel,
        backgroundColor: []
    }
    testLabels.forEach(function (label: string) {
        let amountInRange: number = 0;
        users.forEach(function (user: BaseUser) {
            user.results.forEach(function (result){
                // minPercentage is beginning of current score category
                // maxPercentage is beginning of next score category
                if (result.percentage >= minPercentage &&
                    result.percentage < maxPercentage &&
                    user.testAllocated === label) {
                    amountInRange++;
                }
            })
        })
        dataset.data.push(amountInRange);
        dataset.backgroundColor.push(color);
    });
    return dataset;
};

/**
 * function to generate the array of names of the tests as labels for the data object
 * 
 * @param {users} Object object containing user information
 * 
 * @return Array the array of strings containing the names of all the tests registered
 *         in the database
 */
async function generateLabels(users) {

    let tests = await getTests();
    let labels =[];

    tests.forEach(function (test) {
        let anyUsers = false;
        users.forEach(function(user) {
            if (user.testAllocated == test.name && !user.testNotTaken) {
                anyUsers = true;
            }
        })
        if (anyUsers) {
            labels.push(test.name);
        }
    });

    return labels;

};