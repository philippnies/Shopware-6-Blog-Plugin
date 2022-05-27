import './component';
import './preview';

const { Application } = Shopware;

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'blog-sidebar-filter',
    label: 'sas-blog.blocks.blog.newestListing.label',
    category: 'sas-blog',
    component: 'sas-cms-block-sidebar-filter',
    previewComponent: 'sas-cms-block-preview-sidebar-filter',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        content: 'blog-sidebar-filter',
    },
});
