<?php


error_reporting(E_ALL);

require_once 'stdlib.php';

// Defines the site path
$site_path = realpath(dirname(__FILE__));
define('__SITE_PATH', $site_path);

// Initialization
require_once __SITE_PATH . '/application/base/Controller.php';
require_once __SITE_PATH . '/application/base/Model.php';
require_once __SITE_PATH . '/application/base/View.php';
/**
 * Index file
 */
include 'stdlib.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Serble</title>

    <link rel="stylesheet" type="text/css" href="./layout/style.css">
    <link href="bootstrap-3.3.5-dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="row">

        </div>
    </div>
</body>
</html>
