cs.util = function(){
    var util
        ,pad
        ;

    pad = function( n ){
        return n < 10 ? '0' + n : n;
    };

    util.prettyDate = function( d ){
        var date;

        // If date is a string, turn it into a Date
        if( typeof d === 'string' ){
            d = new Date( d );
        }

        date = d.getUTCFullYear() + '-'
        + pad( d.getUTCMonth() + 1 ) + '-'
        + pad( d.getUTCDate() ) + 'T'
        + pad( d.getUTCHours() ) + ':'
        + pad( d.getUTCMinutes() ) + ':'
        + pad( d.getUTCSeconds() ) + 'Z';

        return date;
    };

    return util;
};