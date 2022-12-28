<?php declare(strict_types=1);

namespace Sas\BlogModule\Content\SalesChannel;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Dbal\EntityHydrator;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\Uuid\Uuid;

class BlogEntriesSalesChannelHydrator extends EntityHydrator
{
    protected function assign(EntityDefinition $definition, Entity $entity, string $root, array $row, Context $context): Entity
    {
        if (isset($row[$root . '.id'])) {
            $entity->id = Uuid::fromBytesToHex($row[$root . '.id']);
        }
        if (isset($row[$root . '.blogId'])) {
            $entity->productId = Uuid::fromBytesToHex($row[$root . '.blogId']);
        }
        if (isset($row[$root . '.salesChannelId'])) {
            $entity->salesChannelId = Uuid::fromBytesToHex($row[$root . '.salesChannelId']);
        }

        if (isset($row[$root . '.createdAt'])) {
            $entity->createdAt = new \DateTimeImmutable($row[$root . '.createdAt']);
        }
        if (isset($row[$root . '.updatedAt'])) {
            $entity->updatedAt = new \DateTimeImmutable($row[$root . '.updatedAt']);
        }
        $entity->salesChannel = $this->manyToOne($row, $root, $definition->getField('salesChannel'), $context);
        $entity->blog = $this->manyToOne($row, $root, $definition->getField('blog'), $context);

        $this->translate($definition, $entity, $row, $root, $context, $definition->getTranslatedFields());
        $this->hydrateFields($definition, $entity, $root, $row, $context, $definition->getExtensionFields());

        return $entity;
    }
}
