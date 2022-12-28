<?php declare(strict_types=1);

namespace Sas\BlogModule\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1672151335BlogEntitiesSalesChannel extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1672151335;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
            CREATE TABLE `blog_entities_sales_channel` (
              `id` BINARY(16) NOT NULL,
              `blog_id` BINARY(16) NOT NULL,
              `sales_channel_id` BINARY(16) NOT NULL,
              `created_at` DATETIME(3) NOT NULL,
              `updated_at` DATETIME(3) NULL,
              PRIMARY KEY (`id`),
              KEY `idx.blog_id` (`blog_id`),
              KEY `idx.sales_channel_id` (`sales_channel_id`),
              CONSTRAINT `fk.blog_id` FOREIGN KEY (`blog_id`)
                REFERENCES `sas_blog_entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
              CONSTRAINT `fk.sales_channel_id` FOREIGN KEY (`sales_channel_id`)
                REFERENCES `sales_channel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
