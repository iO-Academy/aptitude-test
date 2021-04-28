let count: number = 0;

function pageLeaveAlert() {
    if (count < 2) {
        count ++;
        let modal = document.querySelector('#exampleModal');
        //@ts-ignore;
        modal.style.display = 'block !important';
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

