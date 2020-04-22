/**
 * function to generate the data object for the chart displayed on the front end.
 * @returns the data object for graph.js
 */
async function sendToChart() {   
    let dataForChart = {};
    let labels = await generateLabels();
    let dubiousGrade = await generateDataset("Under 70%", labels, 0, 70, "#f27324");
    let passingGrade = await generateDataset("70% to 97%", labels,  70, 97, "#94ba66");
    let topGrade = await generateDataset("97% and above", labels, 97, 101, "#d2b4f9");

    dataForChart.labels = labels;
    dataForChart.datasets = [dubiousGrade, passingGrade, topGrade];
    return dataForChart;
};

/**
 * function to generate a dataset to be inserted into the chart's data object
 * 
 * @param {datasetLabel} string the label for the dataset
 * @param {testLabels} Array the array of strings containing the names of the tests
 * @param {minPercentage} number the least percentage to be included in the range, inclusive
 * @param {maxPercentage} number the greatest percentage to be included in the range, exclusive
 * @param {color} string the colour code for entries in this dataset
 * 
 * @return Object a dataset object containing: A label, an array of data, and an array of background
 *                colors for that data (all set to the same value, passed in as color) 
 */
async function generateDataset(datasetLabel, testLabels, minPercentage, maxPercentage, color) {

    let dataset = {};
    let users = await createUsersObject();
    users = searchAndFilter(users.data);
    dataset.data = [];
    dataset.label = datasetLabel;
    dataset.backgroundColor = [];

    testLabels.forEach(function (label) {

        let amountInRange = 0;

        users.forEach(function (user) {

            if (!user.testNotTaken && user.percentage >= minPercentage && user.percentage < maxPercentage && user.testAllocated == label) {
                
                amountInRange ++;

            }

        })

        dataset.data.push(amountInRange);
        dataset.backgroundColor.push(color);

    });

    return dataset;   

};

/**
 * function to generate the array of names of the tests as labels for the data object
 * 
 * @return Array the array of strings containing the names of all the tests registered
 *         in the database
 */
async function generateLabels() {

    let tests = await getTests();
    let labels =[];

    tests.forEach(function (test) {

        labels.push(test.name);

    });

    return labels;

};