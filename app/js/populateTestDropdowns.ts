/**
 * populates the test dropdowns for the add user,
 * and test filter for table,
 * changes user duration based on test selected
 */
function populateTestDropdowns () {
    getData('test').then((testsObject) => {
        let testFieldValue;

        if (!testFieldValue) {
            testFieldValue = "1";
        }

        getTemplateAjax('js/templates/testDropdown.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#test_id').innerHTML = template(testsObject);
              document.querySelectorAll(".test_options").forEach((test_option: HTMLInputElement) => {
                populateUserDuration(test_option, testFieldValue);
            });
        });

        getTemplateAjax('js/templates/testAllocatedFilter.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#testAllocated').innerHTML = template(testsObject);
        });



        document.querySelector('#test_id').addEventListener('change', () => {
            testFieldValue = document.querySelector<HTMLInputElement>('#test_id').value;

            document.querySelectorAll(".test_options").forEach((test_option: HTMLInputElement) => {
                populateUserDuration(test_option, testFieldValue);
            });
        });
    });
}