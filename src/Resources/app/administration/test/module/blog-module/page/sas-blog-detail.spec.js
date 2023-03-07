import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import EntityCollection from 'src/core/data/entity-collection.data';
import 'src/module/sw-cms/state/cms-page.state';
import 'src/module/sw-cms/mixin/sw-cms-state.mixin';
import swCmsDetail from 'src/module/sw-cms/page/sw-cms-detail';
import swCmsToolbar from 'src/module/sw-cms/component/sw-cms-toolbar';

Shopware.Component.register('sw-cms-detail', swCmsDetail);
Shopware.Component.register('sw-cms-toolbar', swCmsToolbar);
import 'plugin-admin/src/module/blog-module/page/sas-blog-detail';

async function createWrapper(privileges = [], query = { ids: [] }) {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.directive('tooltip', {});

    return shallowMount(await Shopware.Component.build('sas-blog-detail'), {
        localVue,
        stubs: {
            'sw-page': true,
            'sw-cms-toolbar': await Shopware.Component.build('sw-cms-toolbar'),
            'sw-alert': true,
            'sw-language-switch': true,
            'sw-router-link': true,
            'sw-icon': true,
            'router-link': true,
            'sw-button-process': true,
            'sw-cms-stage-add-section': true,
            'sas-cms-sidebar': true,
            'sw-loader': true,
            'sas-cms-section': true,
            'sw-cms-layout-assignment-modal': true,
            'sw-cms-missing-element-modal': true,
        },
        mocks: {
            $route: { params: { id: 'blog-id' }, query },
            $device: {
                getSystemKey: () => 'Strg',
            },
        },
        provide: {
            cmsPageTypeService:{
            },
            systemConfigApiService: {
                getConfig: () => Promise.resolve({
                    'core.systemWideLoginRegistration.isCustomerBoundToSalesChannel': true,
                }),
            },
            acl: {
                can: (identifier) => {
                    if (!identifier) {
                        return true;
                    }

                    return privileges.includes(identifier);
                },
            },
            repositoryFactory: {
                create: (entity) => {
                    const collections = new EntityCollection('', '', {}, {}, [
                        { id: '1a2b3c', locked: false },
                    ]);

                    return {
                        search: () => Promise.resolve(collections),
                        get: () => {
                            if (entity === 'sas_blog_entries') {
                                return Promise.resolve({
                                    title: 'Blog Title',
                                    slug: 'blog-title',
                                });
                            } else {
                                return Promise.resolve({
                                    sections: [
                                        {},
                                    ],
                                });
                            }
                        },
                        create: jest.fn(() => Promise.resolve()),
                        save: jest.fn(() => Promise.resolve()),
                    };
                },
            },
            entityFactory: {},
            entityHydrator: {},
            loginService: {},
            cmsService: {
                getCmsBlockRegistry: () => {
                    return {
                        'product-listing': {},
                    };
                },
            },
            appCmsService: {},
            cmsDataResolverService: {},
        },
    });
}

describe('module/blog-module/page/sas-blog-detail', () => {
    let cmsPageStateBackup;

    beforeAll(() => {
        cmsPageStateBackup = { ...Shopware.State._store.state.cmsPageState };

        Shopware.Service().register('shopwareDiscountCampaignService', () => {
            return { isDiscountCampaignActive: jest.fn(() => true) };
        });
    });

    beforeEach(() => {
        Shopware.State._store.state.cmsPageState = { ...cmsPageStateBackup };
    });

    it('should be a Vue.js component', async () => {
        const wrapper = await createWrapper();

        expect(wrapper.vm).toBeTruthy();
    });

    it('should display page title at the top of the page', async () => {
        const wrapper = await createWrapper();
        await wrapper.vm.$nextTick();

        const pageTitle = wrapper.find('.sw-cms-detail__page-name');
        console.log(pageTitle, '321321')

        expect(pageTitle.text()).toContain('Blog Title');
    });

});
