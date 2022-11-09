export function click(sidebarFormToggle, sidebarFormClose) {


    document.addEventListener('click', (event) => {

      let target = event.target;

      let modalEnter = target.closest('.modal-enter');
      if (modalEnter) {

        sidebarFormToggle();

        let templateContent = document.getElementById(modalEnter.dataset.modal).content;
        let copyNode = templateContent.cloneNode(true);
        document.querySelector('.sidebar__content').append(copyNode);
        setTimeout(()=>{document.querySelector('.sidebar__input').focus()}, 100);

        let formSidebar = document.querySelector('.sidebar__form');
        formSidebar.onsubmit = async (e) => {
          /*e.preventDefault();
            let formData = new FormData(formSidebar);*/
            sidebarFormClose(); 
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
          sidebarFormClose();
          return;
      }

    });


        
}