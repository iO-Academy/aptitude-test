var pageLeft = false

function pageLeaveAlert() {
    if (!pageLeft) {
        alert ('Beware, if you leave the page the test will end!')
    }
}

function cancelTest() {
    if (document.visibilityState === "hidden") {
        pageLeft = true
        finishTest()
    }
}

document.addEventListener("mouseleave", pageLeaveAlert);
document.addEventListener("visibilitychange", cancelTest);

