# aws-did-you-mean

## AWS CloudSearch suggester

This little tool will help you retrieve suggestions from AWS
CloudSearch. It's nothing fancy, but it does the job. Pass in your
CloudSearch specifics, a suggester, and ultimately a query.

## Usage

### Install

npm install aws-did-you-mean --save

### Example

```javascript
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
```

### Warning

This is a work in progress. Use at your discretion, and your own risk.

### License

This tool is released under an MIT license.
