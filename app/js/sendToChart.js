/**
 * function to generate the data object for the chart displayed on the front end.
 * @returns the data object for graph.js
 */
function sendToChart() {   


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