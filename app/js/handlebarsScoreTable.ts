import {BaseUser, User} from "./interfaces/User";
import {Scores} from "./interfaces/Scores";
import {UserAnswers} from "./interfaces/UserAnswers";

/**
 * Sorts the array of user objects by their 'dateCreated' with the
 * newest at the top
 *
 * @return array of user objects in the desired order
 */
async function sortUsersObjectByDate() {
    let usersObject = await createUsersObject()
    usersObject.data.sort(function(a, b){
        let dateA = a.dateCreated
        let dateB = b.dateCreated
        return dateB - dateA //sort by date descending
    })

    return usersObject
}

/**
 * Get the handlebars template for table rows (adminTable.hbs), combine
 * with user objects and send this to searching and filtering.
 */
async function updateScoreTable() {
    let userInfo = await sortUsersObjectByDate();
    let HBTemplate = await getTemplateAjax('js/templates/adminTable.hbs');
    let filteredUserArray = searchAndFilter(userInfo.data);
    let paginatedArrays = splitArray(filteredUserArray, 20);

    updateChart(filteredUserArray);
    if (paginatedArrays.length >= 1 ){
        printFilteredResultsToScreen(HBTemplate, paginatedArrays[0]);
    } else {
        //This only happens when there are no users to be displayed, cannot pass paginatedArrays[0] when paginatedArrays is empty.
        printFilteredResultsToScreen(HBTemplate, paginatedArrays);
    }
    await displayPageBtns(paginatedArrays);
    pageSelectorFunctionality(HBTemplate, paginatedArrays);
}

/**
 * Checks the length of an array of data objects.
 * If greater than 0, calls function to print them to the table
 * If 0, gives 'no valid results message'
 *
 * @param HBTemplate the handlebars template for creating a table of results
 * @param scoresDataArray an array of data objects returned from the API
 * and filtered by user settings
 */
function printFilteredResultsToScreen(HBTemplate: string, scoresDataArray: Array<any>) {
    if (scoresDataArray.length < 1) {
        let score_list = document.querySelector('.score_list');
        score_list.innerHTML = 'No results!';
    } else {
        produceTable(HBTemplate,{data: scoresDataArray});
    }
}

/**
 * Turns data from parent element (userTable handlebars template) into an object.
 *
 * @param event is the event fired off by the function
 */
function createObjectFromParentElement(event: Event) {
    let parentElement = (event.target as HTMLElement).parentElement;
    let userTime = parentElement.getAttribute("dataTimeAllowed");
    let [ userTimeMinutes, userTimeSeconds ] = userTime.split(":");
    const userInfo: User = {
        name: parentElement.getAttribute("dataName"),
        email: parentElement.getAttribute("dataEmail"),
        id: parentElement.getAttribute("dataId"),
        timeMinutes: userTimeMinutes,
        timeSeconds: userTimeSeconds,
        canRetake: parseInt(parentElement.getAttribute("dataCanRetake")),
        dataTestId: parentElement.getAttribute("dataTestId"),
    }

    return userInfo;
}

/**
 * Adds event listener to the edit buttons.
 */
function addEditEventListeners() {
    let editButtons = document.querySelectorAll(".modalBtn");
    editButtons.forEach(function(editButton) {
        editButton.addEventListener('click', function (e) {
            openDialog()
            let userInfo = createObjectFromParentElement(e)
            getData("test").then((data) => {
                createEditModal(userInfo, data.data)
            })
        })
    })
}

/**
 * Adds event listener to the delete buttons.
 */
function addDeleteEventListeners() {
    let userItems = document.querySelectorAll(".delete-user-button")
    userItems.forEach(function (userItem) {
        userItem.addEventListener('click', function (e: any) {
            let userId = e.target.parentElement.getAttribute("dataId")
            deleteUser(userId)
        })
    })
}

/**
 * Sends the API call to delete a user with the specified ID
 *
 * @param userId
 */
function deleteUser(userId: number) {
    let baseUrl = getBaseUrl()
    let url = baseUrl + "user/delete/" + userId
    fetch(url, {"method": "post"})
        .then(function () {
            updateScoreTable()
        })
}

/**
 * Compiles the data object with the handlebars template
 *
 * @param HBTemplate the handlebars template for creating a table of results
 * @param scoresDataObject an array of data objects returned from the API
 * and filtered by user settings
 */
function produceTable (HBTemplate: string, scoresDataObject) {
    scoresDataObject.data.forEach(function (scoreData: Scores) {
        switch (true) {
            case scoreData.percentage >= 97:
                scoreData.topGrade = true
                break
            case scoreData.percentage >= 70:
                scoreData.passingGrade = true
                break
            case scoreData.percentage > 0 || scoreData.percentage == '0.00':
                scoreData.fail = true
                break
            default:
                scoreData.notTakenYet = true
                break
        }
    })

    let template: Function = Handlebars.compile(HBTemplate);
    let score_list = document.querySelector(".score_list");
    score_list.innerHTML = "";
    let html = template(scoresDataObject);
    score_list.innerHTML += html;

    addEditEventListeners();
    addDeleteEventListeners();
    addEventListenersForDownloadButtons();
    addEventListenersForViewResults();
    addEventListenersForScoreBreakdownButtons();
}

function addEventListenersForDownloadButtons() {
    document.querySelectorAll('.download-user-results-button').forEach((button) => {
        button.addEventListener('click', (e: any) => {
            e.preventDefault()
            getData("result?id=" + e.target.parentElement.getAttribute("dataId")).then(resultData => {
                getData("question").then(questionData => {
                    let userResults: Object = JSON.parse(JSON.parse(resultData.data.answers));
                    let questionObj: Object = {};
                    let parentElement: Element = e.target.parentElement
                    let userName: string = parentElement.getAttribute("dataname")
                    let userPercentage: number = +parentElement.getAttribute("datapercentage")
                    let userResultsTable: Object = {};
                    questionData.data.forEach(item => {
                        if (item.text.length > 49) {
                            questionObj[item.id] = item.text.substring(0, 49) + "...";
                        } else {
                            questionObj[item.id] = item.text;
                        }
                    });
                    for (let result in userResults) {
                        userResultsTable[result] = {
                            result: result,
                            question: questionObj[result],
                            userAnswer: userResults[result].answerID,

                        };
                        if (userResults[result]["isCorrect"]) {
                            userResultsTable[result].correct = "correct"
                        } else {
                            userResultsTable[result].correct = "incorrect"

                        }
                    }
                    downloadFile(`${userName}_aptitude_test_results`, createCSV(userResultsTable, userName, userPercentage, resultData.data.score))
                })
            })
        })
    })
}

/**
 * Add listener for click on view-results-button, to open viewResultsModal
 * Get and compile HBS template for user results table
 * Get user's results and test questions, create new object from questions, and loop through both to create object for populating HBS table
 */
async function addEventListenersForViewResults() {
    let userResultsTemplate = await getTemplateAjax("js/templates/userResults.hbs");
    let template: Function = Handlebars.compile(userResultsTemplate);
    let resultsTable: Element = document.querySelector("#view-results-modal-content");
    let userResultsTable: Object = {};
    document.querySelectorAll(".view-results-button").forEach((button) => {
        button.addEventListener("click", (e: any) => {
            openViewResultsModal();
            addEventListenersForCloseResults();
            getData("result?id=" + e.target.parentElement.getAttribute("dataId")).then(resultData => {
                getData("question").then(questionData => {
                    let userResults: Object = JSON.parse(JSON.parse(resultData.data.answers));
                    let questionObj: Object = {};
                    questionData.data.forEach(item => {
                        if (item.text.length > 49) {
                            questionObj[item.id] = item.text.substring(0, 49) + "...";
                        } else {
                            questionObj[item.id] = item.text;
                        }
                    });
                    for (let result in userResults) {
                        userResultsTable[result] = {
                            result: result,
                            question: questionObj[result],
                            userAnswer: userResults[result].answerID,
                            correct: false
                        };
                        userResultsTable[result].correct = userResults[result]["isCorrect"] === true;
                    }
                    resultsTable.innerHTML = template(userResultsTable);
                });
            });
        })
    });
}

/**
 * Add listener for close-view-results button and overlay div to close modal on click
 */
function addEventListenersForCloseResults() {
    document.querySelectorAll(".close-view-results").forEach(item => {
        item.addEventListener("click", () => {
            closeViewResultsModal();
        });
    });
}

async function addEventListenersForScoreBreakdownButtons() {
    let userResultsTemplate = await getTemplateAjax("js/templates/scoreBreakdown.hbs");
    let template: Function = Handlebars.compile(userResultsTemplate);
    let resultsTable: Element = document.querySelector("#view-results-modal-content");
    let categories: Array<Object> = [
        {
            category: "Q1-3: Starter",
            percentage: 0
        },
        {
            category: "Q4-8: Comparison",
            percentage: 0
        },
        {
            category: "Q9-13: Syntax",
            percentage: 0
        },
        {
            category: "Q14-18: Procedure",
            percentage: 0
        },
        {
            category: "Q19-23: Logic",
            percentage: 0
        },
        {
            category: "Q24-30: Sequence",
            percentage: 0
        }
    ]
    document.querySelectorAll(".score-breakdown-button").forEach((button) => {
        button.addEventListener("click", (e: any) => {
            openViewResultsModal();
            addEventListenersForCloseResults();
            getData("result?id=" + e.target.parentElement.getAttribute("dataId")).then(resultData => {
                let scoreBreakdownTable: Object = {};
                let userResults: Object = JSON.parse(JSON.parse(resultData.data.answers));
                let userResultsArray = []
                let category1Score = 0
                let category2Score = 0
                let category3Score = 0
                let category4Score = 0
                let category5Score = 0
                let category6Score = 0
                for (let result in userResults) {
                    userResultsArray.push({
                        "answerID": userResults[result].answerID,
                        "isCorrect": userResults[result].isCorrect
                    })
                }
                userResultsArray.forEach(result => {
                    if (result.isCorrect === true) {
                        switch (true) {
                            case userResultsArray.indexOf(result) < 4:
                                category1Score++
                                break
                            case userResultsArray.indexOf(result) < 9:
                                category2Score++
                                break
                            case userResultsArray.indexOf(result) < 14:
                                category3Score++
                                break
                            case userResultsArray.indexOf(result) < 19:
                                category4Score++
                                break
                            case userResultsArray.indexOf(result) < 24:
                                category5Score++
                                break
                            case userResultsArray.indexOf(result) < 31:
                                category6Score++
                                break
                        }
                    }
                })

                categories[0]['percentage'] = Math.round(category1Score/3 * 100)
                categories[1]['percentage'] = Math.round(category2Score/5 * 100)
                categories[2]['percentage'] = Math.round(category3Score/5 * 100)
                categories[3]['percentage'] = Math.round(category4Score/5 * 100)
                categories[4]['percentage'] = Math.round(category5Score/5 * 100)
                categories[5]['percentage'] = Math.round(category6Score/7 * 100)

                scoreBreakdownTable = {

                }
                categories.forEach(category => {
                    let index = categories.indexOf(category)
                    scoreBreakdownTable[index] = {
                        category: category['category'],
                        percentage: category['percentage']
                    }
                })

                resultsTable.innerHTML = template(scoreBreakdownTable);
            });
        })
    });
}

updateScoreTable();
