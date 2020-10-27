var pageLeft = false
document.addEventListener("mouseleave", () => {
    if (!pageLeft) {
        alert ('Beware, if you leave the page the test will end!')
    }
})

document.addEventListener("visibilitychange", event => {
    if (document.visibilityState === "hidden") {
        pageLeft = true
        finishTest()
    }
})

