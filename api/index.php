<?php

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;

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
| Vercel runtime environment
|--------------------------------------------------------------------------
*/

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
| Bootstrap Laravel directly
|--------------------------------------------------------------------------
*/

require dirname(__DIR__) . '/vendor/autoload.php';

/** @var Application $app */
$app = require dirname(__DIR__) . '/bootstrap/app.php';

/*
|--------------------------------------------------------------------------
| Ensure the View service provider is registered
|--------------------------------------------------------------------------
|
| Laravel 13's normal package discovery registers this locally, but
| the Vercel runtime is currently failing to resolve the "view"
| binding. Register it explicitly for this serverless runtime.
|
*/

$app->register(\Illuminate\View\ViewServiceProvider::class);

$app->handleRequest(Request::capture());