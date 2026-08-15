<?php

putenv('APP_ENV=local');
putenv('APP_DEBUG=true');

$_ENV['APP_ENV'] = 'local';
$_ENV['APP_DEBUG'] = 'true';

$_SERVER['APP_ENV'] = 'local';
$_SERVER['APP_DEBUG'] = 'true';

foreach ([
    'SESSION_DRIVER' => 'array',
    'CACHE_STORE' => 'array',
    'QUEUE_CONNECTION' => 'sync',
    'LOG_CHANNEL' => 'stderr',
] as $key => $value) {
    if (getenv($key) === false) {
        putenv("{$key}={$value}");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
}

$storagePath = '/tmp/laravel';

foreach ([
    $storagePath,
    "{$storagePath}/app/private",
    "{$storagePath}/app/public",
    "{$storagePath}/framework/cache/data",
    "{$storagePath}/framework/sessions",
    "{$storagePath}/framework/views",
    "{$storagePath}/logs",
] as $directory) {
    if (!is_dir($directory)) {
        mkdir($directory, 0777, true);
    }
}

putenv("LARAVEL_STORAGE_PATH={$storagePath}");
$_ENV['LARAVEL_STORAGE_PATH'] = $storagePath;
$_SERVER['LARAVEL_STORAGE_PATH'] = $storagePath;

require __DIR__ . '/../public/index.php';