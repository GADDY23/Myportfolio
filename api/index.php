<?php

require dirname(__DIR__) . '/vendor/autoload.php';

$app = require dirname(__DIR__) . '/bootstrap/app.php';

$request = \Illuminate\Http\Request::capture();

try {
    echo "BEFORE HANDLE\n";

    $app->handleRequest($request);

    echo "\nAFTER HANDLE\n";

} catch (\Throwable $e) {
    echo "\n===== REAL ERROR =====\n";
    echo "CLASS: " . get_class($e) . "\n";
    echo "MESSAGE: " . $e->getMessage() . "\n";
    echo "FILE: " . $e->getFile() . "\n";
    echo "LINE: " . $e->getLine() . "\n\n";
    echo $e->getTraceAsString();
}