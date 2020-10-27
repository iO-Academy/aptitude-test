var pageLeft = false
document.addEventListener("visibilitychange", event => {
    if (document.visibilityState === "hidden") {
        pageLeft = true
        finishTest()
    }
})
