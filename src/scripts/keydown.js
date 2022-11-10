export function keydown(sidebarFormClose) {

    document.addEventListener('keydown', function (event) {

       if (event.code == 'Escape') {
        sidebarFormClose();
      }
      
    });
}