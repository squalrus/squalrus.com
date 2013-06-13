/**
 * Activity Stream
 */
var ActivityStream = function( ){
    this.stream = [];
    this.html = '';
};

ActivityStream.prototype.push = function( item ){
    this.stream.push( item );
};

ActivityStream.prototype.toString = function( ){

    // Sort by date
    this.stream.sort( function( a, b ){ return parseFloat( b.id ) - parseFloat( a.id ) } );

    for( var i =0; i < this.stream.length; i++ )
        this.html += this.stream[i].toString();

    return this.html;
};

/**
 * Activity Item
 */
var ActivityItem = function( date, html ){
    this.id = +date;
    this.html = html;
};

ActivityItem.prototype.toString = function( ){
    return this.html;
};
