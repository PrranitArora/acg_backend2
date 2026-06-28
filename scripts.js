const details = document.querySelectorAll('.faq-section details');
details.forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    details.forEach(other => {
      if (other !== detail) other.open = false;
    });
  });
});

const carouselTrack = document.querySelector('.carousel-track');
const carouselButtons = document.querySelectorAll('.carousel-button');

if (carouselTrack) {
  const scrollStep = Math.round(carouselTrack.clientWidth * 0.7);
  const maxScroll = () => carouselTrack.scrollWidth - carouselTrack.clientWidth;

  const scrollCarousel = direction => {
    const left = direction === 'next' ? scrollStep : -scrollStep;
    carouselTrack.scrollBy({
      left,
      behavior: 'smooth'
    });
  };

  const advanceCarousel = () => {
    if (carouselTrack.scrollLeft >= maxScroll() - 2) {
      carouselTrack.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollCarousel('next');
    }
  };

  carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
      const direction = button.dataset.direction;
      scrollCarousel(direction);
    });
  });

  let autoScrollInterval = null;
  const startAutoScroll = () => {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(advanceCarousel, 3500);
  };

  carouselTrack.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  carouselTrack.addEventListener('mouseleave', startAutoScroll);
  startAutoScroll();
}
