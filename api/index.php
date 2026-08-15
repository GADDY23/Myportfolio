<?php

header('Content-Type: text/plain; charset=utf-8');

echo "API START\n";

require dirname(__DIR__) . '/vendor/autoload.php';

echo "AUTOLOAD OK\n";

$app = require dirname(__DIR__) . '/bootstrap/app.php';

echo "BOOTSTRAP OK\n";

try {
    echo "BEFORE REQUEST\n";

    $request = \Illuminate\Http\Request::capture();

    echo "REQUEST CAPTURED\n";

    /*
     * Boot the Laravel application manually.
     */
    $app->boot();

    echo "APP BOOTED\n";

    /*
     * Check whether the view service exists BEFORE handling
     * the actual request.
     */
    echo "VIEW BOUND: ";
    var_dump($app->bound('view'));

    echo "VIEW PROVIDERS:\n";

    foreach ($app->getProviders(\Illuminate\View\ViewServiceProvider::class) as $provider) {
        echo get_class($provider) . "\n";
    }

    echo "MAKING VIEW SERVICE...\n";

    $view = $app->make('view');

    echo "VIEW SERVICE CREATED: ";
    echo get_class($view) . "\n";

    echo "BEFORE HANDLE REQUEST\n";

    $response = $app->handleRequest($request);

    echo "REQUEST HANDLED\n";

    if ($response instanceof \Symfony\Component\HttpFoundation\Response) {
        echo "STATUS: " . $response->getStatusCode() . "\n";
        echo "CONTENT:\n";
        echo $response->getContent();
    }

} catch (\Throwable $e) {

    http_response_code(500);

    echo "\n\n===== ORIGINAL EXCEPTION =====\n";
    echo "CLASS: " . get_class($e) . "\n";
    echo "MESSAGE: " . $e->getMessage() . "\n";
    echo "FILE: " . $e->getFile() . "\n";
    echo "LINE: " . $e->getLine() . "\n";

    echo "\nTRACE:\n";
    echo $e->getTraceAsString();
}