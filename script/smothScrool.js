const smothScrollElems = document.querySelectorAll('a[href^="#"]:not(a[href="#"])');

smothScrollElems.forEach(link => {
    link.addEventListener('click', (e) => {        

        e.preventDefault();
        const id = link.getAttribute('href').substring(1);
        console.log('id: ', id);
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth'
        });
    });
})