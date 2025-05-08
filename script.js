const carousel = document.getElementById("carousel");
let images = carousel.children;
let imgWidth = images[0].offsetWidth + 20; // image + margin
let position = 0;

// Clone les images pour boucle infinie
function cloneImages() {
  const cloneBefore = [];
  const cloneAfter = [];

  for (let i = 0; i < images.length; i++) {
    const cloneA = images[i].cloneNode(true);
    const cloneB = images[i].cloneNode(true);
    cloneBefore.push(cloneA);
    cloneAfter.push(cloneB);
  }

  cloneBefore.reverse().forEach(clone => carousel.prepend(clone));
  cloneAfter.forEach(clone => carousel.appendChild(clone));
  carousel.scrollLeft = images.length * imgWidth; // centre la "vraie" première image
}

function scrollCarousel(direction) {
  carousel.scrollBy({
    left: direction * imgWidth,
    behavior: "smooth"
  });

  position += direction;

  // Réajuste si on atteint les extrémités
  setTimeout(() => {
    const total = images.length;
    if (position <= -total) {
      carousel.scrollLeft += total * imgWidth;
      position = 0;
    } else if (position >= total) {
      carousel.scrollLeft -= total * imgWidth;
      position = 0;
    }
  }, 310); // attendre la fin de l'animation (transition)
}

window.onload = () => {
  cloneImages();
};