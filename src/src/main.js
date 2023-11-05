import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { RhinoAnywhere } from './lib/anywhere';

window.anywhere = new RhinoAnywhere();

createApp(App).mount('#app');

