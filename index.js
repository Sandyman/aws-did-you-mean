/**
 * Created by Sander Huijsen on 25/11/16.
 */
'use strict';
var request = require('request');

class Suggest {

    // The constructor accepts a number of options. You should always pass in
    // name and id; region, domain and date should be changed if necessary:
    // var suggest = new Suggest({
    //     name: '[YOUR SEARCH DOMAIN NAME HERE]',
    //     id: '[YOUR SEARCH DOMAIN ID HERE]'
    // });
    // You can find both values in your CloudSearch dashboard (endpoints).

    constructor(options) {
        const prefix = 'search';
        const path = 'suggest';
        var name = options.name;
        var id = options.id;
        var region = options.region || 'us-east-1';
        var domain = options.domain || 'cloudsearch.amazonaws.com';
        var date = options.date || '2013-01-01';

        // Pass in suggester here, or by calling setSuggester(). See below.
        this._suggester = options.suggester;

        // Create and store the AWS Search url.
        this._searchUrl = 'http://' + prefix + '-' + name + '-' + id + '.' + region + '.' + domain + '/' + date + '/' + path;
    }

    // Set suggester. You can specify multiple suggesters in CloudSearch, this
    // gives you the flexibility to change to another "on the fly". If you don't
    // expect to change your suggester, you can also pass it to the constructor
    // as a field in the options.

    setSuggester(suggester) {
        this._suggester = suggester || this._suggester;
    }

    // Get all suggestions, of any. You will get all suggestions in this form:
    // [
    //    {
    //        suggestion: 'some suggestion',
    //        score: 0,
    //        id: ''
    //    },
    //    {
    //        ...
    //    }
    // ]
    // In your code, simply iterate over the list, and show the suggestion.

    getAll(query, callback) {
        var properties = {
            q: query,
            suggester: this._suggester
        };

        request(
            {
                url: this._searchUrl,
                method: 'GET',
                qs: properties,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }, (error, response, body) => {
                if (!error) {
                    error = true;
                    if (response.statusCode === 200) {
                        var answer = JSON.parse(body);
                        if (answer.hasOwnProperty('suggest')) {
                            var sg = answer.suggest;
                            if (sg.hasOwnProperty('suggestions')) {
                                callback(sg.suggestions);
                                error = false;
                            }
                        }
                    }
                }
                if (error) {
                    callback([], 'No suggestions found. StatusCode = ' + response.statusCode);
                }
            }
        );
    }
}

module.exports = Suggest;
