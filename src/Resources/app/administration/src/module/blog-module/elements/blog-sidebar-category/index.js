import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'blog-sidebar-category',
    label: 'sas-blog.elements.newestListing.preview.label',
    component: 'sas-cms-el-sidebar-category',
    configComponent: 'sas-cms-el-config-sidebar-category',
    previewComponent: 'sas-cms-el-preview-sidebar-category',
    disabledConfigInfoTextKey: 'sw-cms.elements.sidebarCategoryNavigation.infoText.navigationElement',
});
