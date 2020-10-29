/**
 *
 * @param testId the id of the test to get questions for
 *
 * @returns {Promise<void>} returns a JavaScript Object containing data as request from the API
 */
async function getTestDataById(testId: string): Promise<any> {
   return getData(`question?test_id=${testId}`);
}

async function populateViewQuestionsTables() {
    let HBTemplate = await getTemplateAjax('js/templates/questionsByTestTable.hbs');
    let template: Function = Handlebars.compile(HBTemplate);
    let tableContainer = document.querySelector('#accordion');
    let testData = await getData('/test');
    for (let i = 0; i < testData.data.length ; i++) {
        let tests = await getTestDataById(testData.data[i].id);
        tests.testname = testData.data[i].name;
        tests.testId = testData.data[i].id;
        tableContainer.innerHTML += template(tests);
    }
    document.querySelectorAll(".edit-question").forEach((btn) => {
        btn.addEventListener('click', async (clickedBtn: any) => {
            const {id} = clickedBtn.target.parentElement.dataset;
            window.location.href = `editQuestion.html#${id}`;
        });
    });
    document.querySelectorAll('.panel').forEach( (panel) => {
        panel.querySelector('a').addEventListener('click', (e)=> {
            let arrow = panel.querySelector('span');
            let table = panel.querySelector('.panel-collapse');
            if (table.classList.contains('in')) {
                arrow.classList.remove('glyphicon-menu-down');
                arrow.classList.add('glyphicon-menu-up');
            } else {
                arrow.classList.remove('glyphicon-menu-up');
                arrow.classList.add('glyphicon-menu-down');
            }
        });
    });
}

populateViewQuestionsTables();
