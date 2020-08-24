const burger = document.querySelector('.burger');

const move = document.querySelector('header');

function handleClick() {
  //controls nav animation
  move.classList.toggle('move');
}
burger.addEventListener('click', handleClick);
