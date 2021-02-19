async function addCategory():Promise<void> {
    let categoriesObject = await getData('/category');
    const responseMessage = document.querySelector('#addedCategoryConfirmation');
    document.querySelector<HTMLFormElement>('.categoriesForm').addEventListener('submit', (e) => {
        e.preventDefault();
        let newCategory: string = document.querySelector<HTMLFormElement>('#categoryName').value;
        if (newCategory.length > 255) {
            responseMessage.textContent = 'Error - Category Name Exceeds 255 characters.';
            responseMessage.classList.add('alert-danger');
            responseMessage.classList.remove('alert-success');
        } else {
            let listOfCategories = [];
            categoriesObject.data.forEach((category) => {
                listOfCategories.push(category.name);
            })
            if (!listOfCategories.includes(newCategory)) {
                let data: object = {"name": newCategory};
                let dataToSend: FormData = jsonToFormData(data);
                document.querySelector<HTMLFormElement>('#categoryName').value = '';

                sendData(dataToSend, 'category').then((data) => {

                    if (data.success) {
                        responseMessage.textContent = 'Success! Category added';
                        responseMessage.classList.remove('alert-danger');
                        responseMessage.classList.add('alert-success');
                        populateCategories();
                        populateTableCategoryDropdown();
                        populateNewUserCategoryDropdown();
                        setTimeout(() => {
                            responseMessage.textContent = '';
                            responseMessage.classList.remove('alert-success');
                        }, 3000)
                    } else {
                        responseMessage.textContent = 'Error - Category Not Added';
                        responseMessage.classList.add('alert-danger');
                        responseMessage.classList.remove('alert-success');
                    }
                });
            } else {
                responseMessage.textContent = 'Error - Cannot Duplicate Category';
                responseMessage.classList.add('alert-danger');
                responseMessage.classList.remove('alert-success');
            }
        }
    });
}

addCategory(); 