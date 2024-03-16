const hasClass = function( elem, c ) {
    return elem.classList.contains( c );
};

export function closest( e, classname ) {
    if( hasClass( e, classname ) ) {
        return e;
    }
    if(e.parentNode.nodeName !== 'BODY')
        return e.parentNode && closest( e.parentNode, classname );

    return null;
}