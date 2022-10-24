export default function slider() {
  
      const swiper1 = new Swiper('.swiper1', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 7000,
        },
  
        // If we need pagination
   /*     pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },*/
  
        spaceBetween: 10,
        slidesPerView: 1,
        speed: 2000,
      });
  
}
  