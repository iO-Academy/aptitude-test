function pageLeaveAlert() {
    alert ('Beware, if you leave the page the test will end!')
}

function cancelTest() {
    if (document.visibilityState === "hidden") {
        console.log('cancel')
        let pageLeft: boolean = true
        finishTest(pageLeft)
    }
}

document.addEventListener("mouseleave", pageLeaveAlert);
document.addEventListener("visibilitychange", cancelTest);

