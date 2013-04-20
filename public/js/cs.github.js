/**
 * GitHub API for chadschulz.com
 */
 cs.github = ( function(){

    // Variables
    var profileUrl = 'https://api.github.com/users/squalrus'
        ,eventsUrl = 'https://api.github.com/users/squalrus/events';

    $.ajax({
        url: profileUrl
        ,success: function( data, status ){
            var el = $( '#github-status' );
            el.html( data.name );
        }
    });

})();