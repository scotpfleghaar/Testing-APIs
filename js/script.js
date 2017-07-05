/*jslint browser: true*/
/*global $, jQuery*/

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
    var street = $('#street').val(),
        city = $('#city').val(),
        address = street + ', ' + city,
        streeturl = '<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '">';
    $body.append(streeturl);

    //NYTIMES

    var nytBaseUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=',
        nytApiKey = '&api-key=537d9b4dfbed483b85a48da1d5c98345',
        nytUrl = nytBaseUrl + city + '&sort=newest' + nytApiKey;

    $.getJSON(nytUrl)
        .done(function (data) {
            $nytHeaderElem.text('New York Times Articles About ' + city);
            $.each(data.response.docs, function () {
                var articleLink = '<a href="' + this.web_url + '">' + this.headline.main + '</a>';
                var articleLead = '<p>' + this.lead_paragraph + '</p>';
                $nytElem.append('<li class="article">' + articleLink + articleLead + '</li>');
            });
        })
        .fail(function () {
            $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
        });

    // Wikipedia
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
        city + '&format=json';

    // Set a timeout of 8 seconds to get the Wikipedia articles
    var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text('failed to get wikipedia resources');
    }, 8000);

    $.ajax(wikiUrl, {
            dataType: 'jsonp'
        })
        .done(function (data) {
            var articleTitles = data[1],
                articleUrls = data[3];

            $.each(articleTitles, function (i, title) {
                $wikiElem.append('<li><a href="' + articleUrls[i] + '">' + title + '</a></li>');
            });

            clearTimeout(wikiRequestTimeout);

        });

    return false;
}

$('#form-container').submit(loadData);
