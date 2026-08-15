<?php

use Illuminate\Http\Request;

try {
    $storagePath = '/tmp/laravel-storage';

    $directories = [
        $storagePath,
        "{$storagePath}/app",
        "{$storagePath}/app/private",
        "{$storagePath}/app/public",
        "{$storagePath}/framework",
        "{$storagePath}/framework/cache",
        "{$storagePath}/framework/cache/data",
        "{$storagePath}/framework/sessions",
        "{$storagePath}/framework/views",
        "{$storagePath}/logs",
    ];

    foreach ($directories as $directory) {
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }
    }

    // Vercel runtime environment
    putenv("LARAVEL_STORAGE_PATH={$storagePath}");
    putenv('SESSION_DRIVER=array');
    putenv('CACHE_STORE=array');
    putenv('QUEUE_CONNECTION=sync');
    putenv('LOG_CHANNEL=stderr');

    $_ENV['LARAVEL_STORAGE_PATH'] = $storagePath;
    $_ENV['SESSION_DRIVER'] = 'array';
    $_ENV['CACHE_STORE'] = 'array';
    $_ENV['QUEUE_CONNECTION'] = 'sync';
    $_ENV['LOG_CHANNEL'] = 'stderr';

    $_SERVER['LARAVEL_STORAGE_PATH'] = $storagePath;
    $_SERVER['SESSION_DRIVER'] = 'array';
    $_SERVER['CACHE_STORE'] = 'array';
    $_SERVER['QUEUE_CONNECTION'] = 'sync';
    $_SERVER['LOG_CHANNEL'] = 'stderr';

    // Composer
    require __DIR__ . '/../vendor/autoload.php';

    // Bootstrap Laravel
    $app = require __DIR__ . '/../bootstrap/app.php';

    // Explicitly tell Laravel where writable storage is.
    $app->useStoragePath($storagePath);

    // Handle request
    $app->handleRequest(Request::capture());

} catch (\Throwable $e) {

    http_response_code(500);

    header('Content-Type: text/plain; charset=utf-8');

    echo "VERCEL LARAVEL RUNTIME ERROR\n\n";
    echo "Class: " . get_class($e) . "\n";
    echo "Message: " . $e->getMessage() . "\n\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n\n";
    echo "Trace:\n";
    echo $e->getTraceAsString();
}