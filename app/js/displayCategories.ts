// function to get categories via api
async function displayCategories() {
    try {
        let dataObj = await fetch('localhost:8080/category');
        let categories = await dataObj.json();
    }
    catch(error) {
        console.log(`couldnt fetch ${error}`);
    }

    // console.log(categories);
    // let templateHBS = await fetch('templates/categoryItems.hbs');
    // var template = Handlebars.compile(templateHBS);
    // // document.querySelector('#categoriesContainer').innerHTML;
    // categories.data.forEach(category => {
    //     document.querySelector('#categoriesContainer').innerHTML += "blah"; // template(category);
    // })
}

displayCategories();