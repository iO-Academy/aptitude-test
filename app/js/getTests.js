fetch('http://localhost:8080/test').then(function(data){
    return data.json()
}).then(function(tests){
    let source = document.querySelector('#testTemplate').innerHTML
    let template = Handlebars.compile(source)
    document.querySelector('#test_id').innerHTML = template(tests)
})