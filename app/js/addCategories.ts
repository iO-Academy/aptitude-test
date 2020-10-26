// on click of submit on add-form
// contact the api (POST req fetch) and we add a new category with the name that was in the input

let newCategory = document.querySelector<HTMLFormElement>('#addCategoryForm');


document.querySelector('form').addEventListener('submit', () => {

    fetch('localhost:8080/category', {
        method: 'post',
        body: JSON.stringify({"name": "${newCategory}"})
    }).then()

})
