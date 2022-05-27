import './component';
import './preview';

const { Application } = Shopware;

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'blog-sidebar-category',
    label: 'sas-blog.blocks.blog.newestListing.label',
    category: 'sas-blog',
    component: 'sas-cms-block-sidebar-category',
    previewComponent: 'sas-cms-block-preview-sidebar-category',
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        content: 'blog-sidebar-category',
    },
});
