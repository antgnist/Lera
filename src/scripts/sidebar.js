export function sidebarFormToggle() {

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

    document
      .querySelector('body')
      .classList.toggle('body--noscroll');    
  }


  export function sidebarFormClose() {
    document
      .querySelector('.sidebar__wrapper')
      .classList.remove('sidebar__wrapper--open');
    document
      .querySelector('.sidebar__overlay')
      .classList.remove('sidebar__overlay--open');
    document
      .querySelector('.sidebar')
      .classList.remove('sidebar--open');
  
    document
      .querySelector('.sidebar__content')
      .querySelectorAll('*')
      .forEach((child) => child.remove());

    document
      .querySelector('body')
      .classList.remove('body--noscroll');    
  }