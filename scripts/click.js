export default function click() {

    document.addEventListener('click', (event) => {

      let target = event.target;


      let modalEnter = target.closest('.modal-enter');
      if (modalEnter) {

        sidebarFormToggle();

        let templateContent = document.getElementById(modalEnter.dataset.modal).content;
        let copyNode = templateContent.cloneNode(true);
        document.querySelector('.sidebar__content').append(copyNode);
        document.querySelector('.sidebar__input').focus();

        let formSidebar = document.querySelector('.sidebar__form');
        formSidebar.onsubmit = async (e) => {
          /*e.preventDefault();
            let formData = new FormData(formSidebar);*/
            sidebarFormToggle(); 
            /*
            let response = await fetch(
              'https://webhook.site/c4eb1c67-4d73-4857-9ac9-c257d0368338',
              {
                method: 'POST',
                body: formData,
              }
            );
      
            console.log(
              'Запрос Обратного звонка отправлен',
              'Статус: ',
              response.status
            );
            */
        };
      
        return;
      }
        

     
        
      if (
          target.closest('.sidebar__overlay--open') ||
          target.closest('.sidebar__close')
        ) {
          sidebarFormToggle();
          return;
      }



      function sidebarFormToggle() {
        document
          .querySelector('.sidebar__wrapper')
          .classList.toggle('sidebar__wrapper--open');
        document
          .querySelector('.sidebar__overlay')
          .classList.toggle('sidebar__overlay--open');
        document
          .querySelector('.sidebar')
          .classList.toggle('sidebar--open');
      
        document
          .querySelector('.sidebar__content')
          .querySelectorAll('*')
          .forEach((child) => child.remove());
      }


    });
        
}