<?php

/**
 * Autoload model
 * @param $model Model name
 * @return false
 * @return true
 */
function __autoload($model)
{
    $file = __SITE_PATH . '/application/models/' . strtolower($model) . '.php';

    if (!file_exists($file)) {
        return false;
    }

    include $file;

    return true;
}

/**
 * Outputs HTML code
 * @param $code
 */
function html_output($code)
{
    echo $code . PHP_EOL;
}