const clearDataList = () => {
    $('#data').html("")
}

const instantiateListElement = (text) => {
    var li = document.createElement('li');
    li.classList.add('list-group-item')
    li.innerHTML = text
    
    return li
}

$('#search-form').submit(async (e)  => {
    // Prevent reload
    e.preventDefault()
    
    var url
    //  Check dropdown value
    var searchType = $('#searchType :selected').val()
    // Obtaining the form data
    var searchQuery = $('#searchbar').val()
    
    switch (searchType) {
        case 'movie':
            url = '/movie/'
            break
        case 'tvshow':
            url = '/tvshow/'
            break
        case 'actor':
            url = '/actor/'
            break
        default:
            alert('Choose an option!')
    }
    url += encodeURI(searchQuery)
    
    try {
        const res = await fetch(url, {method: 'POST'})
        const json = await res.json()
        const data = json[0]

        clearDataList()

        if(!data) {
            $('#data').append(instantiateListElement("No data found for " + searchQuery + " as " + searchType + " :("))
        }

        for (let key in data) {
            var text = key + " " + data[key]
            $('#data').append(instantiateListElement(text))
        }
    
    } catch (e) {
        clearDataList()
        $('#data').append(instantiateListElement("No content found"))
        console.log('Could not fetch movie, error: ' + e)
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