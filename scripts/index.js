import {sidebarFormToggle, sidebarFormClose} from './sidebar.js';
import {click} from "./click.js";
import {keydown} from "./keydown.js";
import slider from "./slider.js";


click(sidebarFormToggle, sidebarFormClose);
keydown(sidebarFormClose);
slider();

