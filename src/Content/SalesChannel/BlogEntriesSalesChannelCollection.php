<?php declare(strict_types=1);

namespace Sas\BlogModule\Content\SalesChannel;

use Sas\BlogModule\Content\SalesChannel\BlogEntriesSalesChannelEntity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void                    add(BlogEntriesSalesChannelEntity $entity)
 * @method void                    set(string $key, BlogEntriesSalesChannelEntity $entity)
 * @method BlogEntriesSalesChannelEntity[]    getIterator()
 * @method BlogEntriesSalesChannelEntity[]    getElements()
 * @method BlogEntriesSalesChannelEntity|null get(string $key)
 * @method BlogEntriesSalesChannelEntity|null first()
 * @method BlogEntriesSalesChannelEntity|null last()
 */
class BlogEntriesSalesChannelCollection extends EntityCollection
{

    public function getApiAlias(): string
    {
        return 'blog_entries_sales_channel_collection';
    }

    protected function getExpectedClass(): string
    {
        return BlogEntriesSalesChannelEntity::class;
    }
}
