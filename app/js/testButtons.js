let totalUsers= 300
let usersPerPage = 20

//takes the number of users and how many users you want per page and outputs a list of numbered anchors and a prev and next button

let maxPageNumber = Math.ceil(totalUsers/usersPerPage)
let source = document.querySelector('#paginationTemplate').innerHTML
let template = Handlebars.compile(source)
let data = {pageNo : []}
for (let i=1; i<=maxPageNumber; i++) {
    data.pageNo.push(i)
}
let html = template(data)
document.querySelector('#numberButtons').innerHTML += html


//populateHandlebars('#buttonBox', 'testButtons.hb', APIpath)

pageNumber = document.querySelector('.page-link').value


if (pageNumber == 1) {
    document.querySelector('#prev').style.disabled = disabled
}
else if (pageNumber == maxPageNumber) {
    document.querySelector('#next').style.disabled = disabled
}