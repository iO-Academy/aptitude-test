let base_url = getBaseUrl();
let time_return = null;
let state_return = null;

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
        name: 'default_time',
        value: time
    };

    let settings = {
        method:'POST',
        body: jsonToFormData(data)
    }

    // let fetchData = await fetch(base_url + '/setting', settings).then(data => data)
    // await fetchData
    // let fetchJson = await fetchData.json()
    // await fetchJson
    // return fetchJson;

    fetch(base_url + '/setting', settings)
        .then(response => response.json())
        .then(response => {
            state_return = response.success;
    })

    return state_return

}
