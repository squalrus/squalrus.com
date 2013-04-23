/**
 * Twitter API for chadschulz.com
 */
 cs.twitter = ( function(){

    // Variables
    var searchURL = 'http://search.twitter.com/search.json?q='
        ,username = '%40chadschulz';

    $.ajax({
        url: 'http://www.twitter.com/chadschulz'
        ,success: function( data, status ){
            var el = $( '#twitter-status' );
            el.html( data );
        }
    });

})();