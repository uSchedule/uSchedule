require('./bootstrap');

import Vue from 'vue';
import VueMaterial from 'vue-material';

Vue.use(VueMaterial);

Vue.material.registerTheme({
    default: {
        primary: {
            color: 'teal',
            hue: '700'
        },
        accent: 'red',
    },
    edit: {
        primary: {
            color: 'grey',
            hue: '700'
        },
        accent: {
            color: 'grey',
            hue: '700'
        }
    }
});

// Auth
import LoginForm from './views/auth/Login.vue';
import RegisterForm from './views/auth/Register.vue';
import EmailForm from './views/auth/passwords/Email.vue';
import ResetForm from './views/auth/passwords/Reset.vue';

import Dashboard from './views/Dashboard.vue';
import Navbar from './components/header/Navbar.vue';
import Edit from './views/schedule/Edit.vue';
import Sidebar from './views/university/Sidebar.vue';

const app = new Vue({
    el: '#app',
    components: {
        Dashboard,
        Navbar,
        LoginForm,
        RegisterForm,
        Edit,
        EmailForm,
        ResetForm,
        Sidebar
    }
});
