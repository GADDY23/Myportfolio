<?php

use Illuminate\Http\Request;
use Illuminate\View\ViewServiceProvider;
use Illuminate\Filesystem\FilesystemServiceProvider;
use Illuminate\Events\EventServiceProvider;

header('Content-Type: text/plain; charset=utf-8');

require dirname(__DIR__) . '/vendor/autoload.php';

$app = require dirname(__DIR__) . '/bootstrap/app.php';

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

putenv("LARAVEL_STORAGE_PATH={$storagePath}");
$_ENV['LARAVEL_STORAGE_PATH'] = $storagePath;
$_SERVER['LARAVEL_STORAGE_PATH'] = $storagePath;

putenv('APP_ENV=production');
putenv('APP_DEBUG=false');
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
| Register core Laravel providers explicitly
|--------------------------------------------------------------------------
|
| Vercel is not loading the normal Laravel provider state correctly.
|
*/

$app->register(\Illuminate\Filesystem\FilesystemServiceProvider::class);
$app->register(\Illuminate\Events\EventServiceProvider::class);
$app->register(\Illuminate\View\ViewServiceProvider::class);

/*
|--------------------------------------------------------------------------
| Handle request
|--------------------------------------------------------------------------
*/

try {
    $app->handleRequest(Request::capture());
} catch (\Throwable $e) {
    http_response_code(500);

    header('Content-Type: text/plain; charset=utf-8');

    echo "LARAVEL VERCEL ERROR\n\n";
    echo "CLASS: " . get_class($e) . "\n";
    echo "MESSAGE: " . $e->getMessage() . "\n";
    echo "FILE: " . $e->getFile() . "\n";
    echo "LINE: " . $e->getLine() . "\n\n";
    echo $e->getTraceAsString();
}