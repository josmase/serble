<?php

/**
 * Autoload model
 * @param $model Model name
 */
function __autoload($model)
{
    $file = __SITE_PATH . '/application/models/' . strtolower($model) . '.php';

    if (!file_exists($file)) {
        return false;
    }

    include $file;
}

/**
 * Outputs HTML code
 * @param $content Code
 */
function html_output($code)
{
    echo $code . PHP_EOL;
}