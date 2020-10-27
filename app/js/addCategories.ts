
let newCategory: HTMLFormElement = document.querySelector<HTMLFormElement>('#addCategory');

document.querySelector<HTMLFormElement>('#categoriesForm').addEventListener('submit', (e) => {
    e.preventDefault()

    if (newCategory.length > 255) {
        document.querySelector('#addedCategoryConfirmation').textContent = "Error - Category Name Too Long"
    } else {

    let data = {"name": newCategory};
    let dataToSend = jsonToFormData(data);

    sendData(dataToSend, '/category').then((response) => {
        return response.json()
    }).then((data) => {
        if (data.success === 'true'){
        document.querySelector('#addedCategoryConfirmation').textContent = "Success! Category added"
        } else {
            document.querySelector('#addedCategoryConfirmation').textContent = "Error - Category Not Added"
        }
    })
    }
});

