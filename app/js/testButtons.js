let totalUsers= 413
let usersPerPage = 20
let buttonAmount = Math.ceil(totalUsers/usersPerPage)
let source = document.querySelector('#paginationTemplate').innerHTML
let template = Handlebars.compile(source)
let data = {pageNo : []}
for (let i=1; i<=buttonAmount; i++) {
    data.pageNo.push(i)
}
let html = template(data)
document.querySelector('#numberButtons').innerHTML += html


//populateHandlebars('#buttonBox', 'testButtons.hb', APIpath)
//make page number an array and add each page number to it