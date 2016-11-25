'use strict';

var Suggest = require('../index');

var suggest = new Suggest(
    {
        name: 'coffee-bean-ninja',
        id: 'jl7xoqkekxqshi4vlteubco26i'
    }
);
suggest.setSuggester('bean_suggester');
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
