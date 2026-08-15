<?php

use Illuminate\Http\Request;

try {
    /*
    |--------------------------------------------------------------------------
    | Vercel writable storage
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Environment variables
    |--------------------------------------------------------------------------
    */

    putenv("LARAVEL_STORAGE_PATH={$storagePath}");

    $_ENV['LARAVEL_STORAGE_PATH'] = $storagePath;
    $_SERVER['LARAVEL_STORAGE_PATH'] = $storagePath;

    putenv('SESSION_DRIVER=array');
    putenv('CACHE_STORE=array');
    putenv('QUEUE_CONNECTION=sync');
    putenv('LOG_CHANNEL=stderr');

    $_ENV['SESSION_DRIVER'] = 'array';
    $_ENV['CACHE_STORE'] = 'array';
    $_ENV['QUEUE_CONNECTION'] = 'sync';
    $_ENV['LOG_CHANNEL'] = 'stderr';

    /*
    |--------------------------------------------------------------------------
    | Start Laravel
    |--------------------------------------------------------------------------
    */

    require __DIR__ . '/../public/index.php';

} catch (\Throwable $e) {

    http_response_code(500);

    header('Content-Type: text/plain; charset=utf-8');

    echo "Laravel startup error\n\n";
    echo get_class($e) . "\n";
    echo $e->getMessage() . "\n\n";
    echo $e->getFile() . ':' . $e->getLine() . "\n\n";
    echo $e->getTraceAsString();
}