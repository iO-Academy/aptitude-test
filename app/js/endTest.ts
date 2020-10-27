function pageLeaveAlert() {
    alert ('Beware, if you leave the page the test will end!')
}

function cancelTest() {
    if (document.visibilityState === "hidden") {
        let pageLeft = true
        finishTest(pageLeft)
    }
}

document.addEventListener("mouseleave", pageLeaveAlert);
document.addEventListener("visibilitychange", cancelTest);

