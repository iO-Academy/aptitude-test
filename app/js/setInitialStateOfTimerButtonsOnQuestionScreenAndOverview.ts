let email = getCookie('userEmail')
getUser(email).then( user => {
    if (user.data.showTimer === '1'){
        document.querySelectorAll<HTMLElement>('.timer').forEach(clock => {
            clock.hidden = false;
        })
        document.querySelectorAll('.toggleTimerButton').forEach(hideTimerButton => {
            hideTimerButton.textContent = 'Hide Timer';
        })
    } else {
        document.querySelectorAll<HTMLElement>('.timer').forEach(clock => {
            clock.hidden = true;
        })
        document.querySelectorAll('.toggleTimerButton').forEach(hideTimerButton => {
            hideTimerButton.textContent = 'Show Timer';
        })
    }
})