import { createApp } from 'vue';
import App from '@/components/app/App.vue';
import './components/index.css';
import PrimaryButton from '@/components/ui-components/PrimaryButton.vue';
import Box from '@/components/ui-components/Box.vue';

const app = createApp(App);
app.component('PrimaryButton', PrimaryButton);
app.component('Box', Box);
app.mount('#app');