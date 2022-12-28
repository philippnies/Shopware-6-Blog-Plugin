<?php declare(strict_types=1);

namespace Sas\BlogModule\Content\SalesChannel;

use Sas\BlogModule\Content\Blog\BlogEntriesEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\System\SalesChannel\SalesChannelEntity;

class BlogEntriesSalesChannelEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string
     */
    protected $blogId;

    /**
     * @var string
     */
    protected $salesChannelId;


    /**
     * @var BlogEntriesEntity|null
     */
    protected $blogEntries;


    /**
     * @var SalesChannelEntity|null
     */
    protected $salesChannel;

    public function getBlogId(): string
    {
        return $this->blogId;
    }

    public function setBlogId(string $blogId): void
    {
        $this->blogId = $blogId;
    }

    public function getSalesChannelId(): string
    {
        return $this->salesChannelId;
    }

    public function setSalesChannelId(string $salesChannelId): void
    {
        $this->salesChannelId = $salesChannelId;
    }

    public function getBlogEntries(): ?BlogEntriesEntity
    {
        return $this->blogEntries;
    }

    public function setBlogEntriesSalesChannel(BlogEntriesEntity $blogEntries): void
    {
        $this->blogEntries = $blogEntries;
    }

    public function getSalesChannel(): ?SalesChannelEntity
    {
        return $this->salesChannel;
    }

    public function setSalesChannel(SalesChannelEntity $salesChannel): void
    {
        $this->salesChannel = $salesChannel;
    }
}
