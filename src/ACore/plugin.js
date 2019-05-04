import Acore from "./ACore";

import './js/IconButton';
import IconButtonStyleText from './css/iconbutton.css';


var styleText = [IconButtonStyleText].join('\n');

Acore.$style = Acore._('style').addTo(document.head);
Acore.$style.innerHTML = styleText;

export default Acore;