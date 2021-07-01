const data = require('./fileSystem/obgsfall.json')

let splitedGenresList = [],
    filteredGenres = [],
    genres = [],
    obj = {},
    results = [];
data.forEach(element => {
    const splited = element.genres.split(' ');
    splited.forEach(e => {
        splitedGenresList.push(e)
    });
});
splitedGenresList.forEach(element => {
    if(element!==''){
        filteredGenres.push(element)
    }
});
for (var i = 0; i < filteredGenres.length; i++) {
    obj[filteredGenres[i]] = filteredGenres[i];
}
for (var key in obj) {
    genres.push(key);
}
genres.forEach(element => {
    let result = data.filter((test) => {
        return test.genres.includes(element)
    })
    results.push([element,result])
});

module.exports = results;