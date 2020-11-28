import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md'
    },
    theme: {
        themes: {
            light: {
                background: '#F2F2F2',
                primary: '#6FCF97',
                secondary: '#333333',
                success: '#3cd1c2',
                info: '#ffaa2c',
                error: '#EB5757',
            },
        },
    },
});
