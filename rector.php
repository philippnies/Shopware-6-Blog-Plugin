<?php

declare(strict_types=1);

use Frosh\Rector\Set\ShopwareSetList;
use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\LevelSetList;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->sets([
        ShopwareSetList::SHOPWARE_6_5_0,
    ]);
};
