let userEmail = getCookie('userEmail')
getUser(userEmail).then(function(user) {
    if (!user.success || !isAuthorised(user.data, "1")) {
        window.location.replace("index.html")
    }
})