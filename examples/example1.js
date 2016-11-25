'use strict';

var Suggest = require('../index');

// Create object, and initialise with project specific options
var suggest = new Suggest(
    {
        name: 'coffee-bean-ninja',
        id: 'jl7xoqkekxqshi4vlteubco26i'
    }
);

// We must set the suggester (here, or in the options object passed
// to the constructor).
suggest.setSuggester('bean_suggester');

// Get all suggestions. You'll get an err object if something went wrong.
// Otherwise, you'll get an array of results (which may be empty).
suggest.getAll('amant', (results, err) => {
    if (!err) {
        console.log('Found ' + results.length + ' suggestion(s):');
        results.forEach((item, i) => {
            console.log(i+1 + ' -> ' + item.suggestion);
        });
    } else {
        console.log(err);
    }
});
