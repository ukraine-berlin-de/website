

function createRocket() {
  const elem = document.createElement('img');
  elem.src = '/assets/rocket/img/Rocket.svg';
  elem.classList.add('rocket');
  document.body.appendChild(elem);
  return elem;
}

function createPlanet(num) {
  const elem = document.createElement('img');
  elem.src = `/assets/rocket/img/Plan${num}.svg`;
  elem.classList.add('planet');
  elem.classList.add(`planet_${num}`)
  document.body.appendChild(elem);
  return elem;
}

const rocket = createRocket();
const planets = [...Array(5).keys()].map((num) => createPlanet(num));

const onWindowScroll = () => {
  if (window.scrollY > 50) {
    rocket.classList.add('rocket-launch');
    for (let i = 0; i < planets.length; i++) {
      planets[i].classList.add(`planet-sky-${i}`);
    }

    window.removeEventListener('scroll', onWindowScroll);
  }
};

window.addEventListener('scroll', onWindowScroll);