function search (copy) {
    let newCopy = []
    let searchInput = document.getElementById('searchForm').value
    let regexSearch = new RegExp('/*' + searchInput + '*/i')
    if (searchInput.length !== 0) {
        copy.forEach(copy => {
            if (regexSearch.test(copy.name) || regexSearch.test(copy.email)) {
                newCopy.push(data)
            }
        })
        return newCopy
    }   else {
        return copy
    }
}