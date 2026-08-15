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

    $response = $app->handleRequest($request);

    echo "REQUEST HANDLED\n";

    if ($response instanceof \Symfony\Component\HttpFoundation\Response) {
        echo "STATUS: " . $response->getStatusCode() . "\n";
        echo "CONTENT:\n";
        echo $response->getContent();
    } else {
        echo "RESPONSE TYPE: " . get_debug_type($response) . "\n";
    }

} catch (\Throwable $e) {
    http_response_code(500);

    echo "\n\n===== LARAVEL EXCEPTION =====\n";
    echo "CLASS: " . get_class($e) . "\n";
    echo "MESSAGE: " . $e->getMessage() . "\n";
    echo "FILE: " . $e->getFile() . "\n";
    echo "LINE: " . $e->getLine() . "\n";
    echo "\nTRACE:\n";
    echo $e->getTraceAsString();
}