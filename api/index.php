<?php

/**
 * Vercel functions have a read-only deployment filesystem. Laravel compiles
 * Blade views and may write framework state, so place that transient state in
 * the function's writable temporary directory.
 *
 * The portfolio does not use a database at runtime. These defaults prevent a
 * missing Vercel environment variable from selecting Laravel's database-backed
 * session, cache, or queue drivers. Explicit Vercel variables always win.
 */
foreach ([
    'LARAVEL_STORAGE_PATH' => '/tmp',
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

$storagePath = getenv('LARAVEL_STORAGE_PATH');

foreach ([
    $storagePath,
    "{$storagePath}/app/private",
    "{$storagePath}/app/public",
    "{$storagePath}/framework/cache/data",
    "{$storagePath}/framework/sessions",
    "{$storagePath}/framework/views",
    "{$storagePath}/logs",
] as $directory) {
    if (! is_dir($directory)) {
        mkdir($directory, 0777, true);
    }
}

require __DIR__ . '/../public/index.php';
