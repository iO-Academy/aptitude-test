let count = 0;

function pageLeaveAlert() {
    count ++;
    alert ('WARNING, stay in this window or you will fail the test!')
}

function alertTimes() {
    if (count < 2) {
        pageLeaveAlert();
    }
}

function cancelTest() {
    if (document.visibilityState === "hidden") {
        console.log('cancel')
        let pageLeft: boolean = true
        finishTest(pageLeft)
    }
}

document.body.addEventListener("mouseleave", alertTimes);
document.addEventListener("visibilitychange", cancelTest);


