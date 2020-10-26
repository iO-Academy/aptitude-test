import {BaseUser, User} from "./interfaces/User";
import {Scores} from "./interfaces/Scores";

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
    addEventListenersForDownloadButtons()
    addEventListenersForViewResults()
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
}

function addEventListenersForDownloadButtons(){
    document.querySelectorAll('.download-user-results-button').forEach((button) => {
        button.addEventListener('click', (e: any) => {
            e.preventDefault()

            getData("result?id=" + e.target.parentElement.getAttribute("dataId"))

            .then((data) => {
                let parentElement = e.target.parentElement
                let userName = parentElement.getAttribute("dataname")
                let userPercentage = parentElement.getAttribute("datapercentage")
                downloadFile(`${userName}_aptitude_test_results`, createCSV(data, userName, userPercentage))
            })
        })
    })
}

/**
 * Add listener for click on view-results-button and open viewResultsModal on click
 */
function addEventListenersForViewResults(){
    document.querySelectorAll('.view-results-button').forEach((button) => {
        button.addEventListener('click', () => {
            openViewResultsModal();
        })
    })
}

updateScoreTable();

