<?php

header('Content-Type: text/plain');

echo "API START\n";

require dirname(__DIR__) . '/vendor/autoload.php';

echo "AUTOLOAD OK\n";

$app = require dirname(__DIR__) . '/bootstrap/app.php';

echo "BOOTSTRAP OK\n";

$app->handleRequest(
    \Illuminate\Http\Request::capture()
);

echo "REQUEST COMPLETE\n";