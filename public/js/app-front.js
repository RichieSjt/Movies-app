const clearDataList = () => {
    $('#title-data').addClass('d-none')
    $('#actor-data').addClass('d-none')

    $('#title-data').html('')
    $('#actor-data').html('<div class="row"><div class="col text-center text-white py-3"><h3>TV Shows</h3></div><div class="col text-center text-white py-3"><h3>Movies</h3></div></div><div class="row"><div class="col justify-content-center" id="tvshows-list"></div><div class="col justify-content-center" id="movies-list"></div></div>')
}

const listToString = (list) => {
    var str = ''

    for (let idx in list)
        str += list[idx] + ', '

    return str
}

const instantiateDivElement = (classes, text) => {
    var div = document.createElement('div')
    div.className = classes
    div.innerHTML = text

    return div
}

const titleDivElement = (title, director, cast, country, release_year, rating, listed_in, description) => {
    var main = instantiateDivElement('container-fluid rounded bg-dark text-white py-3 my-3', '')
    var mainRow1 = instantiateDivElement('row pt-2', '')
    var mainRow2 = instantiateDivElement('row', '')

    //Main Row-1 Col-1
    var mainRow1Col1 = instantiateDivElement('col-auto h4', title)
    mainRow1.append(mainRow1Col1)

    //Main Row-2 Col-1
    var mainRow2Col1 = instantiateDivElement('col container', '')

    var mainRow2Col1Row1 = instantiateDivElement('row', '')
    var mainRow2Col1Row1Col1 = instantiateDivElement('col-auto', '<b>'+release_year+'</b>')
    var mainRow2Col1Row1Col2 = instantiateDivElement('col-auto border border-white', rating)
    mainRow2Col1Row1.append(mainRow2Col1Row1Col1, mainRow2Col1Row1Col2)

    var mainRow2Col1Row2 = instantiateDivElement('row py-3', '')
    var mainRow2Col1Row2Col1 = instantiateDivElement('col', description)
    mainRow2Col1Row2.append(mainRow2Col1Row2Col1)

    mainRow2Col1.append(mainRow2Col1Row1, mainRow2Col1Row2)

    //Main Row-2 Col-2
    var mainRow2Col2 = instantiateDivElement('col container', '')

    var mainRow2Col2Row1 = instantiateDivElement('row', '')
    var mainRow2Col2Row1Col1 = instantiateDivElement('col', '<b>Director: </b>' + (director===''?'N/A':director))
    mainRow2Col2Row1.append(mainRow2Col2Row1Col1)

    var mainRow2Col2Row3 = instantiateDivElement('row pt-3', '')
    var mainRow2Col2Row3Col1 = instantiateDivElement(['col'], '<b>Country: </b>' + country)
    mainRow2Col2Row3.append(mainRow2Col2Row3Col1)

    var mainRow2Col2Row4 = instantiateDivElement('row pt-3', '')
    var mainRow2Col2Row4Col1 = instantiateDivElement('col', '<b>Listed in: </b>' + listToString(listed_in))
    mainRow2Col2Row4.append(mainRow2Col2Row4Col1)

    if (cast === '') {
        mainRow2Col2.append(mainRow2Col2Row1, mainRow2Col2Row3, mainRow2Col2Row4)
    }else {
        var mainRow2Col2Row2 = instantiateDivElement('row pt-3', '')
        var mainRow2Col2Row2Col1 = instantiateDivElement('col', '<b>Cast: </b>' + listToString(cast))
        mainRow2Col2Row2.append(mainRow2Col2Row2Col1)

        mainRow2Col2.append(mainRow2Col2Row1, mainRow2Col2Row2, mainRow2Col2Row3, mainRow2Col2Row4)
    }

    mainRow2.append(mainRow2Col1, mainRow2Col2)
    main.append(mainRow1, mainRow2)

    return main
}

const notFoundDivElement = (message) => {
    var main = instantiateDivElement('container-fluid rounded text-white', '')
    var mainRow1 = instantiateDivElement('row justify-content-center', '')
    var mainRow1Col1 = instantiateDivElement('col-auto bg-dark py-3 my-3', message)

    mainRow1.append(mainRow1Col1)
    main.append(mainRow1)

    return main
}

const searchTitle = async (url, searchQuery, searchType) => {
    try {
        const res = await fetch(url, {method: 'POST'})
        const data = await res.json()
        
        if(!data[0])
            $('#title-data').append(notFoundDivElement('No data found for <b>' + searchQuery + '</b> as ' + searchType + ' :('))

        for (let idx in data)
            $('#title-data').append(titleDivElement(data[idx].title, data[idx].director, data[idx].cast, data[idx].country, data[idx].release_year, data[idx].rating, data[idx].listed_in, data[idx].description))
    
    } catch (e) {
        $('#title-data').append(notFoundDivElement('Content not found'))
        console.log('Could not fetch content, error: ' + e)
    }
    $('#title-data').removeClass('d-none')
}

const searchActor = async (url, searchQuery, searchType) => {
    var foundMovies = false
    var foundTvshows = false

    try {
        const res = await fetch(url, {method: 'POST'})
        const data = await res.json()
        
        if(!data[0])
            $('#actor-data').html(notFoundDivElement('No data found for <b>' + searchQuery + '</b> as ' + searchType + ' :('))

        for (let idx in data) {
            if (data[idx].type === 'Movie') {
                foundMovies = true
                $('#movies-list').append(titleDivElement(data[idx].title, data[idx].director, '', data[idx].country, data[idx].release_year, data[idx].rating, data[idx].listed_in, data[idx].description))
            }
            if (data[idx].type === 'TV Show') {
                foundTvshows = true
                $('#tvshows-list').append(titleDivElement(data[idx].title, data[idx].director, '', data[idx].country, data[idx].release_year, data[idx].rating, data[idx].listed_in, data[idx].description))
            }
        }

        if (!foundMovies) 
            $('#movies-list').append(notFoundDivElement('No movies found for <b>' + searchQuery + '</b> :('))
        if (!foundTvshows) 
            $('#tvshows-list').append(notFoundDivElement('No tv shows found for <b>' + searchQuery + '</b> :('))

    } catch (e) {
        $('#actor-data').html(notFoundDivElement('Content not found'))
        console.log('Could not fetch content, error: ' + e)
    }
    $('#actor-data').removeClass('d-none')
}

$('#search-form').submit(async (e)  => {
    // Prevent reload
    e.preventDefault()
    
    var url
    //  Check dropdown value
    var searchType = $('#searchType :selected').val()
    // Obtaining the form data
    var searchQuery = $('#searchbar').val()
    
    clearDataList()
    switch (searchType) {
        case 'movie':
            searchTitle('/movie/' + encodeURI(searchQuery), searchQuery, searchType)
            break
        case 'tv show':
            searchTitle('/tvshow/' + encodeURI(searchQuery), searchQuery, searchType)
            break
        case 'actor':
            searchActor('/actor/' + encodeURI(searchQuery), searchQuery, searchType)
            break
        default:
            alert('Choose an option!')
    }
})

$('#country-form').submit(async (e)  => {
    // Prevent reload
    e.preventDefault()
    
    // Obtaining the form data
    var searchQuery = $('#searchbar-country').val()
    var url = '/country/' + encodeURI(searchQuery)
    
    try {
        const res = await fetch(url, {method: 'POST'})
        const data = await res.json()

        $("#total-country").html(data["count"])
    } catch (e) {
        console.log('Could not fetch movies in country, error: ' + e)
        $("#total-country").html("Could not fetch movies in country")

    }
})

$('#year-form').submit(async (e)  => {
    // Prevent reload
    e.preventDefault()
    
    // Obtaining the form data
    var searchQuery = $('#searchbar-year').val()
    var url = '/year/' + encodeURI(searchQuery)
    
    try {
        const res = await fetch(url, {method: 'POST'})
        const data = await res.json()

        $("#total-year").html(data["count"])
    } catch (e) {
        console.log('Could not fetch movies in year, error: ' + e)
        $("#total-year").html("Could not fetch movies in year")

    }
})

const getTotalMoviesAndShows = async () => {
    try {
        const res = await fetch('/total-count', {method: 'GET'})
        const data = await res.json()

        $("#total-count").html(data["count"])
    } catch (e) {
        console.log('Could not fetch total count, error: ' + e)
        $("#total-count").html("Could not fetch total count")
    }
}

getTotalMoviesAndShows()