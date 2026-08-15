<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', '1');

header('Content-Type: text/plain; charset=utf-8');

try {
    $storagePath = '/tmp/laravel-storage';

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
    putenv('SESSION_DRIVER=array');
    putenv('CACHE_STORE=array');
    putenv('QUEUE_CONNECTION=sync');
    putenv('LOG_CHANNEL=stderr');

    $_ENV['LARAVEL_STORAGE_PATH'] = $storagePath;
    $_SERVER['LARAVEL_STORAGE_PATH'] = $storagePath;

    $_ENV['SESSION_DRIVER'] = 'array';
    $_ENV['CACHE_STORE'] = 'array';
    $_ENV['QUEUE_CONNECTION'] = 'sync';
    $_ENV['LOG_CHANNEL'] = 'stderr';

    require __DIR__ . '/../public/index.php';

} catch (Throwable $e) {
    http_response_code(500);

    echo "=== PHP/LARAVEL ERROR ===\n\n";
    echo "Class: " . get_class($e) . "\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n\n";
    echo "Trace:\n";
    echo $e->getTraceAsString();
}