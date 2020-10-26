document.addEventListener("visibilitychange", event => {
    if (document.visibilityState === "hidden") {
        alert("You can't change tabs during the test! Unfortunately, the test is over");
    }
})