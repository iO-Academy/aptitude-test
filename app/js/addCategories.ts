document.querySelector<HTMLFormElement>('.categoriesForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let newCategory: string = document.querySelector<HTMLFormElement>('#categoryName').value;
    let responseMessage = document.querySelector('#addedCategoryConfirmation');

    if (newCategory.length > 255) {
        responseMessage.textContent = 'Error - Category Name Too Long.';
    } else {

        let data: object = {"name": newCategory};
        let dataToSend: FormData = jsonToFormData(data);
        document.querySelector<HTMLFormElement>('#categoryName').value = '';

        sendData(dataToSend, 'category').then((data) => {

            if (data.success) {
                responseMessage.textContent = 'Success! Category added';
                responseMessage.classList.remove('alert-danger');
                responseMessage.classList.add('alert-success');
                location.reload();

            } else {
                responseMessage.textContent = 'Error - Category Not Added';
                responseMessage.classList.add('alert-danger');
                responseMessage.classList.remove('alert-success');
            }
        });
    }
});
