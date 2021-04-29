window.eval = function (x :string) {
    console.log('I think you need to EVALuate your life choices!')
}

/**
 * Compares 2 values and allows us to check a conditional statement in HBS
 *
 * @param arg1 first item to compare, the id of the current category from the API
 * @param arg2 second item to compare against first item, the value of 1 which is the id that doesnt need a Delete button
 * @param opts - option to run the code inside result of 'IF' statement on  line 5 categoryItems.hbs
 */
Handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    if (arg1 != arg2) {
        return options.fn(this); //this run the code inside the result of the 'if' stmt in line 5 categoryItems.hbs
    } else {
        return options.inverse(this);
    }
});

function getBaseUrl(): string {
    let isProd = false
    if(isProd) {
        return 'https://api.aptitude-test.dev.io-academy.uk/'
    } else {
        return 'http://localhost:8080/'
    }
}

