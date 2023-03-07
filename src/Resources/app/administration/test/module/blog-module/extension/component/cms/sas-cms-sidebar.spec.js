import { shallowMount, createLocalVue } from '@vue/test-utils';
import 'src/app/component/sidebar/sw-sidebar';
import 'src/app/component/sidebar/sw-sidebar-item';
import 'src/module/sw-cms/mixin/sw-cms-state.mixin';
import swCmsSidebar from 'src/module/sw-cms/component/sw-cms-sidebar';
import 'src/app/component/base/sw-button';

Shopware.Component.register('sw-cms-sidebar', swCmsSidebar);

import 'plugin-admin/src/module/blog-module/extension/component/cms/sas-cms-sidebar';
import 'plugin-admin/src/module/blog-module/extension/component/form/sas-text-field';

async function createWrapper(customOptions = {}) {
    const localVue = createLocalVue();
    localVue.directive('draggable', {});
    localVue.directive('droppable', {});
    localVue.directive('tooltip', {
        bind(el, binding) {
            el.setAttribute('tooltip-message', binding.value.message);
        },
        inserted(el, binding) {
            el.setAttribute('tooltip-message', binding.value.message);
        },
        update(el, binding) {
            el.setAttribute('tooltip-message', binding.value.message);
        },
    });

    const spyGetEntityNameOne = jest.fn(() => 'sas_blog_entries');

    localStorage.clear();

    const options = {
        localVue,
        propsData: {
            page: {
                sections: [],
            },
            blog: {
                title: 'blog title',
                slug: 'blog-slug',
                getEntityName: spyGetEntityNameOne,
            },
        },
        stubs: {
            'sw-sidebar-item': await Shopware.Component.build('sw-sidebar-item'),
            'sw-sidebar': await Shopware.Component.build('sw-sidebar'),
            'sw-button': await Shopware.Component.build('sw-button'),
            'sw-entity-multi-id-select': true,
            'sw-sidebar-collapse': true,
            'sw-text-field': true,
            'sw-select-field': true,
            'sw-cms-block-config': true,
            'sw-cms-block-layout-config': true,
            'sw-cms-section-config': true,
            'sw-context-button': true,
            'sw-context-menu-item': true,
            'sw-cms-sidebar-nav-element': true,
            'sw-entity-single-select': true,
            'sw-modal': true,
            'sw-container': true,
            'sw-checkbox-field': true,
            'sw-upload-listener': true,
            'sw-media-compact-upload-v2': true,
            'sw-switch-field': true,
            'sw-datepicker': true,
            'sas-text-field': true,
            'sas-textarea-field': true,
            'sas-blog-category-tree-field': true,
            'sw-icon': true,
            'sw-sidebar-navigation-item': true,
            'sas-blog-extension-component-sections': true,
        },
        provide: {
            cmsPageTypeService:{
            },
            repositoryFactory: {
                create: () => ({
                    create: () => ({ id: null, slots: [] }),
                    save: () => {},
                }),
            },
            cmsService: {
                getCmsBlockRegistry: () => ({
                    'foo-bar': {},
                }),
                isBlockAllowedInPageType: () => true,
            },
            systemConfigApiService: {
                getValues: () => Promise.resolve('SasBlogModule.config'),
            },
            cmsBlockFavorites: {
                isFavorite: () => true,
                update: () => {},
            },
        },
    };

    return shallowMount(await Shopware.Component.build('sas-cms-sidebar'), {
        ...options,
        ...customOptions,
    });
}

describe('module/sw-cms/component/sw-cms-sidebar', () => {
    beforeAll(() => {
        Shopware.State.registerModule('cmsPageState', {
            namespaced: true,
            state: {
                isSystemDefaultLanguage: true,
            },
        });

        Shopware.Service().register('shopwareDiscountCampaignService', () => {
            return { isDiscountCampaignActive: jest.fn(() => true) };
        });
    });

    it('should be a Vue.js component', async () => {
        const wrapper = await createWrapper();

        expect(wrapper.vm).toBeTruthy();
    });

    it('should have blog detail tab', async () => {
        const wrapper = await createWrapper();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.$refs.blogDetailSidebar).toBeTruthy();
    });
});
