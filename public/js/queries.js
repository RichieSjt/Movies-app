// Given a movie name - Obtain the director, cast, countries and release year
var searchMovie = '7:19';
db.titles.aggregate([
    {$match: {
        $and: [{type: 'Movie'}, {title: searchMovie}]
    }},
    {$project: {
        _id: 0,
        title: 1,
        director: 1,
        cast: 1,
        country: 1,
        release_year: 1
    }}
]);

// Given an actor name - Obtain a list with the movies and a list with the TV shows where he/she has participated
var actor = "June Diane Raphael";
db.titles.aggregate([
  {$unwind: "$cast"},
  {$match: {cast: actor}},
  {$project: {
      _id: 0,
      title: 1,
      director: 1,
      country: 1,
      release_year: 1
  }}
]);

// Given a TV show name - Obtain the director, cast, countries and release year
var searchTvShow = '3%';
db.titles.aggregate([
    {$match: {
        $and: [{type: 'TV Show'}, {title: searchTvShow}]
    }},
    {$project: {
        _id: 0,
        title: 1,
        director: 1,
        cast: 1,
        country: 1,
        release_year: 1
    }}
]);

// Total number of movies and TV shows
db.titles.count()
//7787

// Total number of movies for a given country
var searchCountry = 'Mexico';
db.titles.find({$and: [{type: 'Movie'}, {country: searchCountry}]}).count()
//65

// Total number of TV shows for a given release year
var searchYear= '2005';
db.titles.find({$and: [{type: 'TV Show'}, {release_year: searchYear}]}).count()
//12