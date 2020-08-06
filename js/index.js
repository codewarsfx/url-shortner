const burger = document.querySelector('.burger');
// const header = document.querySelector('header');
const move = document.querySelector('header');
// const links = document.querySelectorAll('.nav-links li');
// console.log(links);
function handleClick() {
  //controls nav animation
  move.classList.toggle('move');

  //   //controls burger animation
  //   header.classList.toggle('header');

  //controls links animation
  //   links.forEach((link, index) => {
  //     if (link.style.animation) link.style.animation = '';
  //     else {
  //       link.style.animation = `fadein .5s  ease forwards ${index / 7 + 0.4}s`;
  //     }
  //   });
}

burger.addEventListener('click', handleClick);
