let count = 0;

function pageLeaveAlert() {
    count ++;
    alert ('Beware, if you leave the page the test will end!')
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


