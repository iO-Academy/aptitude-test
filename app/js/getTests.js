fetch('http://localhost:8080/test').then(function(data){
    return data.json()
}).then(function(tests){
    console.log(tests.data)
})