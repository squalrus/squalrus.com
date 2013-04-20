/**
 * GitHub API for chadschulz.com
 */
 cs.github = ( function(){

    // Variables
    var profileUrl = 'https://api.github.com/users/squalrus'
        ,eventsUrl = 'https://api.github.com/users/squalrus/events'
        ,updateProfile;

    updateProfile = function( data ){
        var $el
        ,html = [];

        $el = $( '#github-profile' );

        html.push( '<p>' + data.login + '</p>' );
        html.push( '<img src="' + data.avatar_url + '">' );

        $el.html( html.join( '' ) );
    };

    updateFeed = function( data ){
        var $el
        ,html = [];

        $el = $( '#github-feed' );

        data.forEach( function( value, index, array ){
            html.push( '<p>' + value.actor.login + ' did a ' + value.type + '</p>' );
        });


        $el.html( html.join( '' ) );
    };

    $.ajax({
        url: profileUrl
        ,success: function( data, status ){
            updateProfile( data );
        }
    });

    $.ajax({
        url: eventsUrl
        ,success: function( data, status ){
            updateFeed( data );
        }
    });

})();