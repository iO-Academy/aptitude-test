let count: number = 0;

function pageLeaveAlert() {
    if (count < 2) {
        count ++;
        let modal = document.querySelector('#warningModal');
        modal.classList.add('show');
        modal.classList.remove('fade');
        document.querySelector("#closeWarning").addEventListener('click', ()=>{
            modal.classList.add('fade');
            modal.classList.remove('show');
        });
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

