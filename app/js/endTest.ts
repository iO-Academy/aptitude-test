let count: number = 0;

function pageLeaveAlert() {
    if (count < 2) {
        count ++;
        alert ('WARNING, stay in this window or you will fail the test!')
    }
}

function cancelTest() {
    if (document.visibilityState === "hidden") {
        let pageLeft: boolean = true
        finishTest(pageLeft)
    }
}

document.body.addEventListener("mouseleave", pageLeaveAlert);
document.addEventListener("visibilitychange", cancelTest);


