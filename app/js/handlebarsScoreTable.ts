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
function createObjectFromElement(event: Event) {
    let element = (event.target as HTMLElement);
    let userTime = element.getAttribute("dataTimeAllowed");
    let [ userTimeMinutes, userTimeSeconds ] = userTime.split(":");
    const userInfo: User = {
        name: element.getAttribute("dataName"),
        email: element.getAttribute("dataEmail"),
        id: element.getAttribute("dataId"),
        timeMinutes: userTimeMinutes,
        timeSeconds: userTimeSeconds,
        canRetake: parseInt(element.getAttribute("dataCanRetake")),
        dataTestId: element.getAttribute("dataTestId"),
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
            let userInfo = createObjectFromElement(e)
            getData("test").then((data) => {
                createEditModal(userInfo, data.data)
            })
        })
    })
}

/**
 * Adds event listener to the delete user buttons.
 */
function addDeleteEventListeners() {
    let deleteButtons = document.querySelectorAll(".delete-user-btn");
    deleteButtons.forEach(function(deleteButton) {
        deleteButton.addEventListener('click', function (e) {
            // @ts-ignore
            let elem: HTMLElement = e.target
            let id: number = parseInt(elem.getAttribute('dataid'))
            openDialog()
            createDeleteModal(id)
        })
    })
}

/**
 * Adds event listener to the yes button in the delete user modal.
 */
function addConfirmDeleteEventListeners() {
    let userItem = document.querySelector<HTMLButtonElement>("#confirmDelete")
    userItem.addEventListener('click', function (e: any) {
        let userId = userItem.dataset.id
        deleteUser(parseInt(userId))
        closeDialog()
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
    addEventListenersForMoreInfoButtons();
    addEventListenerForAnswersTabButton();
    addEventListenerForBreakdownTabButton();
}

function createUserResults(resultData, questionData): Object {
    let userResults: Object = JSON.parse(JSON.parse(resultData.data.answers));
    let questionObj: Object = {};
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
            userAnswer: userResults[result].answerID
        };
        if (userResults[result]["isCorrect"]) {
            userResultsTable[result].correct = "correct";
        }
    }
    return userResultsTable;
}

interface ResultsBreakdownSection {
    name: string;
    score: number;
    questions: number;
    percentage: number;
    startingQuestionNumber?: number;
    finalQuestionNumber?: number;
}

interface ResultsBreakdown {
    sections: ResultsBreakdownSection[];
}

/**
 * function to create a ResultsBreakdown object for a user using their result data object for use in creating a user results breakdown table
 *
 * @param {object} resultData object containing retrieved result data for the user
 * @param {string} test_id test_id for the test the user's been assigned
 *
 * @returns {Promise<ResultsBreakdown>} object containing the results breakdown
 */
async function createUserResultsBreakdown(resultData, test_id: string): Promise<ResultsBreakdown> {
    let breakdown: ResultsBreakdown = {
        sections: []
    };

    // Remove this if statement if you ever want to display a breakdown for a test with test_id that isn't 1
    if (test_id == "1") {
        breakdown.sections.push({name: 'Starter', score: 0, questions: 0, percentage: 0, startingQuestionNumber: 1, finalQuestionNumber: 3});
        breakdown.sections.push({name: 'Comparison', score: 0, questions: 0, percentage: 0, startingQuestionNumber: 4, finalQuestionNumber: 8});
        breakdown.sections.push({name: 'Syntax', score: 0, questions: 0, percentage: 0, startingQuestionNumber: 9, finalQuestionNumber: 13});
        breakdown.sections.push({name: 'Procedure', score: 0, questions: 0, percentage: 0, startingQuestionNumber: 14, finalQuestionNumber: 18});
        breakdown.sections.push({name: 'Logic', score: 0, questions: 0, percentage: 0, startingQuestionNumber: 19, finalQuestionNumber: 23});
        breakdown.sections.push({name: 'Sequence', score: 0, questions: 0, percentage: 0, startingQuestionNumber: 24, finalQuestionNumber: 30});
    }

    let testName = 'Total'
    let testData = await getData("test")
    testData.data.forEach(test => {
        if (test.id == test_id) {
            testName += ` (${test.name})`
        }
    })
    breakdown.sections.push({name: testName, score: 0, questions: 0, percentage: 0});
    let userResults: Object = JSON.parse(JSON.parse(resultData.data.answers));
    let questionNumber = 1;
    for (let result in userResults) {
        breakdown.sections.forEach(section => {
            if ((!section.startingQuestionNumber || !section.finalQuestionNumber)
                || (questionNumber >= section.startingQuestionNumber && questionNumber <= section.finalQuestionNumber)) {
                section.questions++;
                if (userResults[result]["isCorrect"]) {
                    section.score++;
                }
            }
        })
        questionNumber++;
    }
    breakdown.sections.forEach(section => {
        section.percentage = Math.round(100 * section.score / section.questions);
    })
    return breakdown;
}

async function addEventListenersForDownloadButtons() {
    document.querySelectorAll('.download-user-results-button').forEach((button) => {
        button.addEventListener("click", (e: any) => {
            e.preventDefault();
            getData("result?id=" + e.target.parentElement.getAttribute("dataId")).then(resultData => {
                getData("question").then(questionData => {
                    let parentElement: Element = e.target.parentElement;
                    let userName: string = parentElement.getAttribute("dataname");
                    let userPercentage: number = +parentElement.getAttribute("datapercentage");
                    downloadFile(`${userName}_aptitude_test_results.csv`, createCSV(createUserResults(resultData, questionData), userName, userPercentage, resultData.data.score))
                });
            });
        });
    });
}

/**
 * Add listener for click on view-results-button, to open viewResultsModal
 * Get and compile HBS template for user results table
 * Get user's results and test questions, create new object from questions, and loop through both to create object for populating HBS table
 */
async function addEventListenersForViewResults() {
    let userResultsTemplate = await getTemplateAjax("js/templates/userResults.hbs");
    let userResultsBreakdownTemplate = await getTemplateAjax("js/templates/userResultsBreakdown.hbs");
    let template: Function = Handlebars.compile(userResultsTemplate);
    let breakdownTemplate: Function = Handlebars.compile(userResultsBreakdownTemplate);
    let resultsTable: Element = document.querySelector("#view-results-modal-content");
    let resultsBreakdownTable: Element = document.querySelector("#view-results-breakdown-modal-content");
    document.querySelectorAll(".view-results-button").forEach((button) => {
        button.addEventListener("click", (e: any) => {
            displayResultsTableTab();
            openViewResultsModal();
            addEventListenersForCloseResults();
            getData("result?id=" + e.target.getAttribute("dataId")).then(resultData => {
                getData("user").then(userData => {
                    userData.data.forEach(user =>{
                        if (user.id === resultData.data.id) {
                            let testId = user.test_id
                            getData("question?test_id=" + testId).then(questionData => {
                                resultsTable.innerHTML = template(createUserResults(resultData, questionData));
                            })
                            createUserResultsBreakdown(resultData, testId)
                                .then(breakdown => {
                                    resultsBreakdownTable.innerHTML = breakdownTemplate(breakdown);
                                })
                        }
                    })
                });
            });
        });
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

/**
 * function to add a click event listener to the view results modal answers tab button that displays the results table in the modal
 */
function addEventListenerForAnswersTabButton(): void {
    document.querySelector(".open-view-answers-tab").addEventListener("click", displayResultsTableTab);
}

/**
 * function to display the results table in the view results modal
 */
function displayResultsTableTab(): void {
    document.querySelector<HTMLElement>("#view-results-modal-content").style.display = "block";
    document.querySelector<HTMLElement>("#view-results-breakdown-modal-content").style.display = "none";
    document.querySelector<HTMLElement>(".open-view-answers-tab").classList.add("active-tab");
    document.querySelector<HTMLElement>(".open-view-breakdown-tab").classList.remove("active-tab");
}

/**
 * function to add a click event listener to the view results modal answers tab button that displays the results breakdown table in the modal
 */
function addEventListenerForBreakdownTabButton(): void {
    document.querySelector(".open-view-breakdown-tab").addEventListener("click", () => {
        document.querySelector<HTMLElement>("#view-results-modal-content").style.display = "none";
        document.querySelector<HTMLElement>("#view-results-breakdown-modal-content").style.display = "block";
        document.querySelector<HTMLElement>(".open-view-answers-tab").classList.remove("active-tab");
        document.querySelector<HTMLElement>(".open-view-breakdown-tab").classList.add("active-tab");
    });
}

function addEventListenersForMoreInfoButtons() {
    let moreInfoButtons = document.querySelectorAll(".more-info-button")
    moreInfoButtons.forEach(function (moreInfoButton) {
        moreInfoButton.addEventListener('click', function (e: any) {
            let userId = e.target.parentElement.getAttribute("dataId")
            document.querySelector('tr[data-id="' + userId + '"]').classList.toggle('hide')
            if(this.textContent == 'More info') {
                this.textContent = 'Less info';
            } else {
                this.textContent = 'More info';
            }
        })
    })

}
updateScoreTable();
