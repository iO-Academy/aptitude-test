let count: number = 0;
let alertActive: boolean = true;


function pageLeaveAlert() {
    if (count < 2 && alertActive) {
        count ++;
        alert ('WARNING, stay in this window or you will fail the test!')
        alertActive = false;
        setTimeout(()=> {
            alertActive = true;
        }, 5000)
    }
}

function cancelTest() {
    if (document.visibilityState === "hidden") {
        let pageLeft: boolean = true;
        finishTest(pageLeft);
    }
}

document.body.addEventListener("mouseleave", pageLeaveAlert);
document.addEventListener("visibilitychange", cancelTest);


