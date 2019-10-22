let base_url = getBaseUrl();
let time_return = null;

// Gets the current default test time from the API, returns number
function getTimeDefault() {
    fetch(base_url + '/setting')
        .then(response => response.json())
        .then(response => {
            let time = response.data[0].value;
            time_return = time;
        })

    return time_return;
}

// Sets the current default test time from the API, takes number as param, returns success/fail state as bool
function sendTimeDefault(time) {
    let data = {
        settings: [{
        name: 'default_time',
        value: time
    }
    ]};

    let settings = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let state = false

    fetch(base_url + '/setting', settings)
        .then(response => response.json())
        .then(response => {
            return response.success;
        }).then(success => state = success)

    return state
}
