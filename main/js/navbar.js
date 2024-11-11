document.getElementById('navbarToggle').addEventListener('click', function() {
    const navbarMenu = document.getElementById('navbarMenu');
    navbarMenu.classList.toggle('active');
});

document.getElementById('navbar-menu-text').addEventListener('click', function(event){
    event.preventDefault();
    document.body.style.cursor = 'wait'
    setTimeout(function(){
        window.location.href = event.target.href
    }, 1000) 
})