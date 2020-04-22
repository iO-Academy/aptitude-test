/**
 * function to generate the data object for the chart displayed on the front end.
 * @returns the data object for graph.js
 */
async function sendToChart() {   
    let dataForChart = {};
    let labels = await generateLabels();
    let dubiousGrade = await generateDataset("Under 70%", 0, 70, "#f27324");
    let passingGrade = await generateDataset("70% to 97%", 70, 97, "#94ba66");
    let topGrade = await generateDataset("97% and above", 97, 101, "#d2b4f9");

    dataForChart.labels = labels;
    dataForChart.datasets = [dubiousGrade, passingGrade, topGrade];
    return dataForChart;
};

async function generateDataset(label, minPercentage, maxPercentage, color) {

    let dataset = {};
    let labels = await generateLabels();
    let users = await createUsersObject();
    users = filterForGraph(users.data);
    dataset.data = [];
    dataset.label = label;
    dataset.backgroundColor = [];

    labels.forEach(function (label) {

        let amountInRange = 0;
        dataset.backgroundColor.push(color);

        users.forEach(function (user) {

            if (user.percentage >= minPercentage && user.percentage < maxPercentage && user.testAllocated == label) {
                
                amountInRange ++;

            }

        })

        dataset.data.push(amountInRange)

    });

    return dataset;   

};

async function generateLabels() {

    let tests = await getTests();
    let labels =[];

    tests.forEach(function (test) {

        labels.push(test.name);

    });

    return labels;

};