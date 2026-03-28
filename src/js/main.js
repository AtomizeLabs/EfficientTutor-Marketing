import '../css/style.css'
import { renderNav, renderFooter, renderTutorialsHub } from './components.js'

document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
    renderTutorialsHub();
});
