function loadData() {

    var $body = $('body'),
        $wikiElem = $('#wikipedia-links'),
        $nytHeaderElem = $('#nytimes-header'),
        $nytElem = $('#nytimes-articles'),
        $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    var streeturl = '<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '">';
    $body.append(streeturl);
    // YOUR CODE GOES HERE!

    //NYTIMES
    // load nytimes
    // obviously, replace all the "X"s with your own API key
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=537d9b4dfbed483b85a48da1d5c98345';
    $.getJSON(nytimesUrl, function (data) {

        $nytHeaderElem.text('New York Times Articles About ' + city);

        var articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' +
                '</li>');
        };

    }).fail(function (e) {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });
}

$('#form-container').submit(loadData);
