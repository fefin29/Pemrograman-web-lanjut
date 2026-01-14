import './styles/style.css';
import './styles/responsive.css';
import App from './scripts/app';
import swRegister from './scripts/sw-register';
import WebSocketInitiator from "./scripts/web-socket-initiator";

const app = new App({
    button: document.querySelector('#hamburgerButton'),
    drawer: document.querySelector('#navigationDrawer'),
    content: document.querySelector('#mainContent'),
});


window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
    WebSocketInitiator();
});
