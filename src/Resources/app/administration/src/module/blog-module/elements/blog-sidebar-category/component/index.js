import template from './sas-cms-el-sidebar-category.html.twig';
import './sas-cms-el-sidebar-category.scss';

Shopware.Component.register('sas-cms-el-sidebar-category', {
    template,

    mixins: [
        Shopware.Mixin.getByName('cms-element'),
        Shopware.Mixin.getByName('placeholder'),
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('blog-sidebar-category');
        },
    },
});
