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
    let tableOnPage = document.querySelector('.table');
    if(!tableOnPage.classList.contains('hidden')) {
        await displayPageBtns(paginatedArrays);
        pageSelectorFunctionality(HBTemplate, paginatedArrays);
    }
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
 * Adds event listener to the delete buttons.
 */
function addDeleteEventListeners() {
    let userItems = document.querySelectorAll(".delete-user-button")
    userItems.forEach(function (userItem) {
        userItem.addEventListener('click', function (e: any) {
            let userId = this.getAttribute("dataId")
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
    addEventListenersForMoreInfoButtons()
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
    let template: Function = Handlebars.compile(userResultsTemplate);
    let resultsTable: Element = document.querySelector("#view-results-modal-content");
    document.querySelectorAll(".view-results-button").forEach((button) => {
        button.addEventListener("click", (e: any) => {
            openViewResultsModal();
            addEventListenersForCloseResults();
            getData("result?id=" + e.target.getAttribute("dataId")).then(resultData => {
                getData("question").then(questionData => {
                    resultsTable.innerHTML = template(createUserResults(resultData, questionData));
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
