/**
 * Compares 2 values and allows us to check a conditional statement in HBS
 *
 * @param arg1 first item to compare
 * @param arg2 second item to compare against first item
 * @param opts - option to run the code inside result of 'IF' statement on  line 5 categoryItems.hbs
 */
Handlebars.registerHelper('ifEquals', function(arg1, arg2, opts) {
    if (arg1 != arg2) {
        return opts.fn(this); //this run code inside result of if stmt - line 5 categoryItems.hbs
    } else {
        return opts.inverse(this);
    }
});

populateHandlebars('#categoriesContainer', 'js/templates/categoryItem.hbs', 'category');

