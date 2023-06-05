const menu = document.querySelector('.menu')
const menuItens = menu.querySelector('.items')


menu.addEventListener('click', function(){
    menuItens.classList.toggle('hidden')

})