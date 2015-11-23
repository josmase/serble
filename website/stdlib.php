<?php

/**
 * Autoloads a class
 * @param $class Class
 */
function __autoload($class)
{
    include "$class.php";
}

/**
 * Outputs HTML code
 * @param $content Code
 */
function html_output($code)
{
    echo $code . PHP_EOL;
}