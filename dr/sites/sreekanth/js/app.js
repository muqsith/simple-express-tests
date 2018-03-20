document.querySelector('#show').addEventListener('click', function(e) {
    alert('Hello '+ e.target.getAttribute('data-name'));
})
