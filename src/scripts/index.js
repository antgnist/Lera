import './babel';
import '../styles/scss/styles.scss';
import 'normalize.css';

import Swiper, { Navigation, EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { sidebarFormToggle, sidebarFormClose } from './sidebar.js';
import { click } from './click.js';
import { keydown } from './keydown.js';
import { doUpdateTable } from './schedule.js';
import slider from './slider.js';

doUpdateTable();
click(sidebarFormToggle, sidebarFormClose);
keydown(sidebarFormClose);
slider(Swiper, Navigation, EffectFade, Autoplay);
