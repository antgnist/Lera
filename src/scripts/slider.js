export default function slider(Swiper, Navigation, EffectFade, Autoplay) {
  const sliders = document.querySelectorAll('.swiper');
  let mySwipers = []; // Масив со слайдерами
  // Создаем все слайдеры
  sliders.forEach((slider, index) => {
    if (!slider.swiper) {
      mySwipers[index] = new Swiper(slider, {
        modules: [Navigation, EffectFade, Autoplay],
        direction: 'horizontal',
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 7000,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        spaceBetween: 10,
        slidesPerView: 1,
        speed: 1800,
      });
    } else {
      return;
    }
  });
}
