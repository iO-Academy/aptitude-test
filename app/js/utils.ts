function getBaseUrl() {
    let isProd = false
    if(isProd) {
        return 'http://dev.maydenacademy.co.uk/projects/2017/aptitude-test/api/public/'
    } else {
        return 'http://localhost:8080/'
    }
}
