var navbar = document.getElementById('navbar'),
    btn = document.getElementById('nav-button');

var openMenu = function() {
    console.log('navbar animate: ' + navbar.style.height);
    navbar.style.height = parseInt(navbar.style.height) + 6 + 'px';
    if (navbar.style.height !== '90px')
        setTimeout(openMenu, 20);
};

var closeMenu = function() {
    console.log('navbar animate: ' + navbar.style.height);
    navbar.style.height = parseInt(navbar.style.height) - 6 + 'px';
    if (navbar.style.height !== '30px')
        setTimeout(closeMenu, 20);
};

btn.addEventListener('click', function(event) {
    var classes = navbar.classList,
        open = false;

    for (var i=0; i<classes.length; i++) {
        if (classes[i] === 'open')
            open = true;
    }

    if (open) {
        closeMenu();
        navbar.className = 'navbar';
    } else {
        navbar.style.height = '30px';
        openMenu();
        navbar.classList.add('open');
    }
    event.preventDefault();
});