function search (copy) {
    let newCopy = []
    let searchInput = document.getElementById('searchForm').value
    let regexSearch = '[\\w@]*' + searchInput + '[\\w@]*'
    if (searchInput.length !== 0) {
        copy.forEach(data => {
            if (regexSearch.test(data.name) || regexSearch.test(data.email)) {
                newCopy.push(data)
            }
        })
        return newCopy
    }   else {
        return copy
    }
}