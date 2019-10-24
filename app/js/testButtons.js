let totalUsers= 413
let usersPerPage = 20
let buttonAmount = Math.ceil(totalUsers/usersPerPage)
let source = document.querySelector('#paginationTemplate').innerHTML

for (let i=1; i<=buttonAmount; i++) {
    let template = Handlebars.compile(source)
    let data = {pageNo : i}
    let html = template(data)
    document.querySelector('#numberButtons').innerHTML += html
}


//populateHandlebars('#buttonBox', 'testButtons.hb', APIpath)